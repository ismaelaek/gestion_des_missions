import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, DatePicker, Form, Input, Select } from "antd";
import { getJuridAppels, getJuridPremieres } from "../storage/jusridictionsSlice";
import { getProfessionnels } from "../storage/professionnelsSlice";
import moment from "moment";


const { RangePicker } = DatePicker;

const AddMission = () => {
	const dispatch = useDispatch();
	const [parentId, setParentId] = useState(null);
	const { juriAppels, juriPremieres, jurIsLoading } = useSelector(
		(state) => state.jusridictions
	);

	const { professionnels, profIsLoading } = useSelector(
        (state) => state.professionnels
	);
	
	const primeresJuridctions = juriPremieres.filter(
		(juri) => juri.IdJuridictionParent == parentId
	);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();


	useEffect(() => {
		dispatch(getJuridAppels());
		dispatch(getProfessionnels());
		dispatch(getJuridPremieres())
	}, [dispatch])

	const onFinish = async (values) => {
		setLoading(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setLoading(false);
			message.success("مهمة مضافة بنجاح!");
			form.resetFields();
		} catch (error) {
			setLoading(false);
			message.error("حدث خطأ أثناء إضافة المهمة.");
		}
	};
	const handleDateChange = (dates) => {
		const table = dates.map((date) => moment(date).toDate());
		console.log(table);
	}
	return (
		<main className="container pt-5 text-right">
			<h1 className="text-4xl text-red-500 mb-3"> : إضافة مهمة</h1>
			<Form onFinish={onFinish} className="mission-form">
				<div>
					<Form.Item
						name="missionType"
						wrapperCol={{ span: 24 }}
						style={{ textAlign: "end", marginBottom: 0 }}
						rules={[{ required: true, message: "! الرجاء إدخال نوع المهمة" }]}>
						<Input style={{ textAlign: "right" }} />
					</Form.Item>
					<label htmlFor="missionType">: نوع المهمة</label>
				</div>

				<div>
					<Form.Item
						name="appealCourt"
						wrapperCol={{ span: 24 }}
						style={{ textAlign: "end", marginBottom: 0 }}
						rules={[
							{ required: true, message: "! الرجاء اختيار محكمة الاستئناف" },
						]}>
						<Select style={{ textAlign: "right" }} onChange={value=> setParentId(value)}>
							{juriAppels.map((juriAppel) => {
								return (
									<Select.Option key={juriAppel.id} value={juriAppel.id}>
										{juriAppel.JurLibelle_ar}
									</Select.Option>
								);
							})}
						</Select>
					</Form.Item>
					<label htmlFor="appealCourt">: محكمة الاستئناف</label>
				</div>

				<div>
					<Form.Item
						name="primaryCourt"
						wrapperCol={{ span: 24 }}
						style={{ textAlign: "end", marginBottom: 0 }}
						rules={[
							{ required: true, message: "! الرجاء اختيار المحكمة الإبتدائية" },
						]}>
						{primeresJuridctions.length > 0 ? (
							<Select style={{ textAlign: "right" }}>
								{primeresJuridctions.map((juriPremiere) => {
									return (
										<Select.Option
											key={juriPremiere.id}
											value={juriPremiere.id}>
											{juriPremiere.JurLibelle_ar}
										</Select.Option>
									);
								})}
							</Select>
						) : (
							<Select disabled={!parentId} ></Select>
						)}
					</Form.Item>
					<label htmlFor="primaryCourt">: المحكمة اﻹبتدائية</label>
				</div>

				<div>
					<Form.Item
						name="missionDate"
						wrapperCol={{ span: 24 }}
						style={{ textAlign: "end", marginBottom: 0 }}
						rules={[
							{ required: true, message: "! الرجاء اختيار تاريخ المهمة" },
						]}>
						<RangePicker  onChange={handleDateChange}/>
					</Form.Item>
					<label htmlFor="missionDate">: تاريخ المهمة</label>
				</div>

				<div>
					<Form.Item
						name="employee"
						wrapperCol={{ span: 24 }}
						style={{ textAlign: "end", marginBottom: 0 }}
						rules={[{ required: true, message: "! الرجاء اختيار الموظف" }]}>
						<Select style={{ textAlign: "right" }}>
							{professionnels.map((professionnel) => {
								return (
									<Select.Option
										key={professionnel.id}
										value={professionnel.id}>
										{professionnel.nom} {professionnel.prenom}
									</Select.Option>
								);
							})}
						</Select>
					</Form.Item>
					<label htmlFor="employee">: الموظف</label>
				</div>

				<div>
					<Button
						type="primary"
						htmlType="submit"
						className="w-full submit-btn"
						loading={loading}>
						إضافة المهمة
					</Button>
				</div>
			</Form>
		</main>
	);
};

export default AddMission;
