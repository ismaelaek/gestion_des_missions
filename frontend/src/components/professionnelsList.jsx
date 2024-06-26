import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionnels } from "../storage/professionnelsSlice";
import { getCaders, getDirections } from "../storage/dataSlice";
import { SlDrawer } from "react-icons/sl";
import { Link } from "react-router-dom";
import ProfessionnelItem from "./professionnelItem";
import Loader from "./loader";
import { Input, ConfigProvider } from "antd";
import arEG from "antd/lib/locale/ar_EG";
import { FaSearch } from "react-icons/fa";


const ProfessionnelsList = () => {
	const dispatch = useDispatch();
	const { professionnels, profIsLoading } = useSelector(
		(state) => state.professionnels
	);
	const { caders } = useSelector((state) => state.data);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProfessionnels, setFilteredProfessionnels] = useState([]);

	useEffect(() => {
		dispatch(getProfessionnels());
		dispatch(getCaders());
		dispatch(getDirections());
	}, [dispatch]);

	useEffect(() => {
		if (professionnels.length > 0) {
			const filtered = professionnels.filter(
				(item) =>
					item?.nom?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
					item?.prenom?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
					item?.NumeroSomme?.toLowerCase().includes(searchTerm?.toLowerCase())
			);
			setFilteredProfessionnels(filtered);
		}
	}, [professionnels, searchTerm]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const Empty = ({ txt }) => (
		<div className="container flex flex-col justify-center items-center h-96">
			<h1>
				لا يوجد موظفين
				{txt && txt}
			</h1>
			<SlDrawer className="text-9xl" />
			{txt === "" && (
				<span className="my-3">
					إضغط على <Link to={"/newproffesionnel"}>إضافة موظف</Link> لإضافة موظف
					جديد
				</span>
			)}
		</div>
	);

	const ProfList = () => (
		<>
			{filteredProfessionnels.length === 0 ? (
				<Empty txt={" بهده المعايير "} />
			) : (
				<table className="w-full text-right">
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
						{filteredProfessionnels.map((professionel) => (
							<ProfessionnelItem
								key={professionel.id}
								object={professionel}
								caders={caders}
							/>
						))}
					</tbody>
				</table>
			)}
		</>
	);

	if (profIsLoading) {
		return (
			<main className="container flex h-96 justify-center items-center">
				<Loader />
			</main>
		);
	}

	return (
		<main className="container pt-3 text-right">
			{professionnels.length === 0 ? (
				<Empty />
			) : (
				<>
					<div className="flex justify-evenly items-center mb-5">
						<Link
							to={"/newproffesionnel"}
							className="btn btn-outline-primary h-10">
							إضافة موظف
						</Link>
						<ConfigProvider locale={arEG} direction="rtl" >
							<Input
								prefix={<FaSearch />}
								type="text"
								className="h-8 w-1/3 text-right"
								placeholder="ابحث عن موظف"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</ConfigProvider>
						<h1 className="text-4xl text-red-500">قائمة الموظفين</h1>
					</div>
					<ProfList />
				</>
			)}
		</main>
	);
};

export default ProfessionnelsList;
