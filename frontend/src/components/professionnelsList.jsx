import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionnels } from "../storage/professionnelsSlice";
import { getCaders, getDirections } from "../storage/dataSlice";
import { SlDrawer } from "react-icons/sl";
import { Link } from "react-router-dom";
import ProfessionnelItem from "./professionnelItem";
import Loader from "./loader";

const ProfessionnelsList = () => {
	const dispatch = useDispatch();
	const { professionnels, profIsLoading } = useSelector(
		(state) => state.professionnels
	);
	const { caders } = useSelector((state) => state.data);

	useEffect(() => {
		dispatch(getProfessionnels());
		dispatch(getCaders());
		dispatch(getDirections());
	}, [dispatch]);

	const Empty = () => {
		return (
			<div className=" container flex flex-col justify-center items-center h-96">
				<h1>لا يوجد موظفين</h1>
				<SlDrawer className=" text-9xl" />
				<span className=" my-3">
					إضغط على <Link to={"/newproffesionnel"}>إضافة موظف</Link> لإضافة موظف
					جديد
				</span>
			</div>
		);
	};
	const ProfList = () => {
		return (
			<table className=" w-full text-right">
				<thead>
					<tr>
						<th></th>
						<th>اﻹطار</th>
						<th>رقم التأجير</th>
						<th>البريد اﻹلكتروني</th>
						<th>اﻹسم</th>
						<th>النسب</th>
					</tr>
				</thead>
				<tbody>
					{professionnels.map((professionel) => {
						return (
							<ProfessionnelItem
								key={professionel.id}
								object={professionel}
								caders={caders}
							/>
						);
					})}
				</tbody>
			</table>
		);
	};
	if (profIsLoading) {
		return (
			<main className=" container flex h-96 justify-center items-center">
				<Loader />
			</main>
		);
	}
	return (
		<main className=" container  pt-3 text-right">
			{professionnels.length === 0 ? (
				<Empty />
			) : (
				<>
					<div className=" flex justify-between">
						<Link to={"/newproffesionnel"}>إضافة موظف</Link>
						<h1 className="text-4xl text-red-500 mb-3">قائمة الموظفين</h1>
					</div>
					<ProfList />
				</>
			)}
		</main>
	);
};

export default ProfessionnelsList;
