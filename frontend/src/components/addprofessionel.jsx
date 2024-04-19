import { useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Button, Input, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getDirections, getCaders } from "../storage/dataSlice";
const AddProfessionnel = () => {
	const dispatch = useDispatch();
	const { directions, caders, dataIsLoading, error } = useSelector(
		(state) => state.directions
	);

	useEffect(() => {
		dispatch(getDirections());
		dispatch(getCaders());
	}, []);

	const onChange = (value) => {
		console.log(`selected ${value}`);
	};

	const onSearch = (value) => {
		console.log("search:", value);
	};

	return (
		<main className="container pt-5 text-right">
			<h1 className="text-4xl text-red-500 mb-5"> : إضافة موظف</h1>
			<form className="mission-form">
				<div>
					<Input />
					<label htmlFor="">: اﻹسم</label>
				</div>

				<div>
					<Input />
					<label htmlFor="">: النسب</label>
				</div>

				<div>
					<Input />
					<label htmlFor="">: رقم التأجير</label>
				</div>

				<div>
					<Input />
					<label htmlFor="">: البريد اﻹلكتروني</label>
				</div>

				<div>
					<Select>
						{dataIsLoading ? (
							<Select.Option disabled>Loading...</Select.Option>
						) : error ? (
							<Select.Option disabled>Error fetching directions</Select.Option>
						) : (
							directions.map((direction) => (
								<Select.Option
									key={direction.id}
									value={direction.id}>
									{direction.DirLibelle_ar}
								</Select.Option>
							))
						)}
					</Select>
					<label htmlFor="">: الجهة </label>
				</div>

				<div>
					<Select>
						{dataIsLoading ? (
							<Select.Option disabled>Loading...</Select.Option>
						) : error ? (
							<Select.Option disabled>Error fetching caders</Select.Option>
						) : (
							caders.map((cader) => (
								<Select.Option key={cader.id} value={cader.id}>
									{cader.cadreLibelle_ar}
								</Select.Option>
							))
						)}
					</Select>
					<label htmlFor="">: اﻹطار </label>
				</div>

				<Button
					type="primary"
					htmlType="submit"
					className="w-full flex justify-center">
					<FaUserPlus className=" mt-1 mr-2" />
					<span> إضافة الموظف</span>
				</Button>
			</form>
		</main>
	);
};

export default AddProfessionnel;