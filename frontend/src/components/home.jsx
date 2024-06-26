import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionnels } from "../storage/professionnelsSlice";
import { getJuridPremieres } from "../storage/jusridictionsSlice";
import { getMissions } from "../storage/missionsSlice";
import { getEtats } from "../storage/dataSlice";
import { SlDrawer } from "react-icons/sl";
import { Link } from "react-router-dom";
import MissionItem from "./missionItem";
import Loader from "./loader";

const MissionsList = () => {
	const dispatch = useDispatch();
	const {missions, missionsIsLoading} = useSelector(state => state.missions)
	const { professionnels } = useSelector((state) => state.professionnels);
	const {juriPremieres } = useSelector(
		(state) => state.jusridictions
	);
	const { etatsMissions } = useSelector((state) => state.data);

	useEffect(() => {
		dispatch(getMissions());
		dispatch(getProfessionnels());
		dispatch(getJuridPremieres());
		dispatch(getEtats());
	}, [dispatch]);

	const Empty = () => {
		return (
			<div className=" container flex flex-col justify-center items-center h-96">
				<h1>لا يوجد مهمـــات</h1>
				<SlDrawer className=" text-9xl" />
				<span className=" my-3">
					إضغط على <Link to={"/newproffesionnel"}> إضافة مهمة </Link>
					لإضافة مهمة جديدة
				</span>
			</div>
		);
	};
	const MainList = () => {
		return (
			<table className=" w-full text-right">
				<thead>
					<tr>
						<th></th>
						<th className=" text-center">الوجهة</th>
						<th>الحالة</th>
						<th>الموظف</th>
						{/* <th>تاريخ التحرير</th> */}
						<th>الرجوع</th>
						<th>الخروج</th>
						<th>نوع</th>
						<th>رقم</th>
					</tr>
				</thead>

				<tbody>
					{missions.map((mission) => {
						return (
							<MissionItem
								key={mission.id}
								object={mission}
								juridections={juriPremieres}
								profs={professionnels}
								etats={etatsMissions}
							/>
						);
					})}
				</tbody>
			</table>
		);
	};
	if (missionsIsLoading) {
		return (
			<main className=" container flex h-96 justify-center items-center">
				<Loader />
			</main>
		);
	}
	return (
		<main className=" container  pt-3 text-right">
			{missions.length === 0 ? (
				<Empty />
			) : (
				<>
					<div className=" flex justify-between">
						<Link to={"/newmission"} className=" btn btn-outline-primary h-10">
							إضافة مهمة
						</Link>
						<h1 className="text-4xl text-red-500 mb-5">قائمة المهمات</h1>
					</div>
					<MainList />
				</>
			)}
		</main>
	);
};

export default MissionsList;
