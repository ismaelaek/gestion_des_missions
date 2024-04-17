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

const AddProfessionnel = ()=> {
    const onChange = (value) => {
			console.log(`selected ${value}`);
		};
		const onSearch = (value) => {
			console.log("search:", value);
		};
	return (
		<main className=" container pt-5 text-right">
			<h1 className=" text-4xl text-red-500 mb-5"> : إضافة موظف</h1>
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
					<Select >
						<Select.Option value="demo">test</Select.Option>
					</Select>
					<label htmlFor="">: اﻹطار </label>
				</div>

                <Button type="primary" htmlType="submit" className=" w-full">
                    إضافة الموظف
                </Button>
			</form>
		</main>
	);



}

export default AddProfessionnel;