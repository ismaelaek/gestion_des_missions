import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Button, Input, Select, Form, message, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getDirections, getCaders } from "../storage/dataSlice";
import { addProfessionnel } from "../storage/professionnelsSlice";
import arEG from "antd/lib/locale/ar_EG";

const AddProfessionnel = () => {
	const dispatch = useDispatch();
	const { directions, caders, dataIsLoading, error } = useSelector(
		state => state.data
	);
	const { profIsLoading, profError } = useSelector(
		(state) => state.professionnels
	);

	const [form] = Form.useForm();
	const [formData, setFormData] = useState({
		nom: "",
		prenom: "",
		Email: "",
		NumeroSomme: "",
		IdDirection: "",
		IdCadre: "",
	});

	useEffect(() => {
		dispatch(getDirections());
		dispatch(getCaders());
	}, []);

	const onFinish = () => {
		dispatch(addProfessionnel(formData));
		if (profError) {
			message.error(profError)
		} else {
            form.resetFields();
		}
	};
	const handleChange = (e) => {
		setFormData({
            ...formData,
            [e.target.name]: e.target.value,
		});
	}
	const handleDirectionChange = (value) => {
		setFormData({
			...formData,
			IdDirection: value,
		});
	};

	const handleCadreChange = (value) => {
		setFormData({
			...formData,
			IdCadre: value,
		});
	};
	return (
		<ConfigProvider direction="rtl" locale={arEG}>
			<main className="container pt-5 text-right">
				<h1 className="text-4xl text-red-500 mb-3"> : إضافة موظف</h1>
				<Form
					form={form}
					onFinish={onFinish}
					className="mission-form"
					method="POST">
					<div>
						<Form.Item
							name="prenom"
							wrapperCol={{ span: 24 }}
							className=" text-right w-full"
							style={{ textAlign: "end", marginBottom: 0 }}
							rules={[{ required: true, message: "! الرجاء إدخال الاسم" }]}>
							<Input
								style={{ textAlign: "right" }}
								name="prenom"
								onChange={handleChange}
							/>
						</Form.Item>
						<label htmlFor="prenom">: الاسم </label>
					</div>

					<div>
						<Form.Item
							name="nom"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "end", marginBottom: 0 }}
							rules={[{ required: true, message: "! الرجاء إدخال النسب" }]}>
							<Input
								style={{ textAlign: "right" }}
								onChange={handleChange}
								name="nom"
							/>
						</Form.Item>
						<label htmlFor="nom">: النسب</label>
					</div>

					<div>
						<Form.Item
							name="NumeroSomme"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "right", marginBottom: 0 }}
							rules={[
								{ required: true, message: "! الرجاء إدخال رقم التأجير" },
							]}>
							<Input
								style={{ textAlign: "right" }}
								name="NumeroSomme"
								onChange={handleChange}
							/>
						</Form.Item>
						<label htmlFor="numeroSomme">: رقم التأجير </label>
					</div>

					<div>
						<Form.Item
							name="Email"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "right", marginBottom: 0 }}
							rules={[
								{
									required: true,
									message: "! الرجاء إدخال البريد الإلكتروني",
									type: "email",
								},
							]}>
							<Input
								style={{ textAlign: "right" }}
								name="Email"
								onChange={handleChange}
							/>
						</Form.Item>
						<label htmlFor="email">: البريد اﻹلكتروني</label>
					</div>

					<div>
						<Form.Item
							name="IdDirection"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "right", marginBottom: 0 }}
							rules={[{ required: true, message: "! الرجاء اختيار المديرية" }]}>
							<Select
								loading={dataIsLoading}
								placeholder="اختر المديرية"
								onChange={handleDirectionChange}
								style={{ textAlign: "right" }}>
								{directions.map((direction) => (
									<Select.Option key={direction.id} value={direction.id}>
										{direction.DirLibelle_ar}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<label htmlFor="direction">: المديرية</label>
					</div>

					<div>
						<Form.Item
							name="IdCadre"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "right", marginBottom: 0 }}
							rules={[{ required: true, message: "! الرجاء اختيار الإطار" }]}>
							<Select
								loading={dataIsLoading}
								placeholder="اختر الإطار"
								onChange={handleCadreChange}
								style={{ textAlign: "right" }}>
								{caders.map((cader) => (
									<Select.Option key={cader.id} value={cader.id}>
										{cader.cadreLibelle_ar}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<label htmlFor="cader">: اﻹطار</label>
					</div>

					<div>
						<Button
							type="primary"
							htmlType="submit"
							className="w-full flex justify-center submit-btn"
							loading={profIsLoading}>
							{!profIsLoading && <FaUserPlus className=" mt-1 mr-2" />}
							<span> إضافة الموظف</span>
						</Button>
					</div>
				</Form>
			</main>
		</ConfigProvider>
	);
};

export default AddProfessionnel;
