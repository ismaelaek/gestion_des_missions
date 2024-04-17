import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Select,
} from "antd";
const { RangePicker } = DatePicker;

const AddMission = () => {
    const onChange = (value) => {
			console.log(`selected ${value}`);
		};
		const onSearch = (value) => {
			console.log("search:", value);
        };
    const filterOption = (input, option) => {
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    }
	return (
		<main className=" container pt-5 text-right">
			<h1 className=" text-4xl text-red-500 mb-5"> : إضافة مهمة</h1>
			<form className="mission-form">
				<div>
					<Input />
					<label htmlFor="">: نوع المهمة</label>
				</div>

				<div>
					<Select>
						<Select.Option value="demo"> محكمة الاستئناف الرباط</Select.Option>
					</Select>
					<label htmlFor="">: محكمة الاستئناف</label>
				</div>

				<div>
					<Select>
						<Select.Option value="demo">محكمة الاستئناف الرباط</Select.Option>
					</Select>
					<label htmlFor=""> : المحكمة اﻹبتدائية</label>
				</div>

				<div>
					<RangePicker name="date-range" />
					<label htmlFor=""> : تاريخ المهمة</label>
				</div>

				<div>
					<Select
						showSearch
						placeholder="Select a person"
						optionFilterProp="children"
						onChange={onChange}
						onSearch={onSearch}
						filterOption={filterOption}
						options={[
							{
								value: "jack",
								label: "Jack",
							},
							{
								value: "lucy",
								label: "Lucy",
							},
							{
								value: "tom",
								label: "Tom",
							},
						]}
					/>
					<label htmlFor="">: الموظف</label>
				</div>

				<Button type="primary" htmlType="submit" className=" w-full">
					إضافة المهمة
				</Button>
			</form>
		</main>
	);
};
export default AddMission;
