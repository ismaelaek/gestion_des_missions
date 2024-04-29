import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa"; // Changed to FaUserEdit for edit icon
import { Button, Input, Select, Form, message, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getDirections, getCaders } from "../storage/dataSlice";
import { getProfessionnels, updateProfessionnel } from "../storage/professionnelsSlice";
import { useParams , useNavigate} from "react-router-dom";
import arEG from "antd/lib/locale/ar_EG";

const EditProfessionnel = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
    const { id } = useParams();
    const { professionnels } = useSelector(state => state.professionnels)
    const professionnel = professionnels.find((item) => item.id == id);
	const { directions, caders, dataIsLoading, error } = useSelector(
		(state) => state.data
	);

	const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        id: id,
		nom: professionnel?.nom,
		prenom: professionnel?.prenom,
		Email: professionnel?.Email,
		NumeroSomme: professionnel?.NumeroSomme,
		IdDirection: professionnel?.IdDirection,
		IdCadre: professionnel?.IdCadre,
	});

    useEffect(() => {
        dispatch(getProfessionnels());
		dispatch(getDirections());
		dispatch(getCaders());
		if (!professionnel) {
			navigate("/professionnels");
		}
	}, []);

	const onFinish = () => {
        dispatch(updateProfessionnel(formData)); 
		form.resetFields();
		navigate("/professionnels");
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

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
				<h1 className="text-4xl text-red-500 mb-3">: تعديل بيانات الموظف</h1>
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
							rules={[{ required: true, message: "! الرجاء إدخال الاسم" }]}
							initialValue={formData?.prenom} 
						>
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
							rules={[{ required: true, message: "! الرجاء إدخال النسب" }]}
							initialValue={formData?.nom} 
						>
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
							]}
							initialValue={formData?.NumeroSomme} 
						>
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
							]}
							initialValue={formData?.Email} 
						>
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
							rules={[{ required: true, message: "! الرجاء اختيار المديرية" }]}
							initialValue={formData?.IdDirection} 
						>
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
							rules={[{ required: true, message: "! الرجاء اختيار الإطار" }]}
							initialValue={formData?.IdCadre} 
						>
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
							className="w-full flex justify-center submit-btn">
							<FaUserEdit className=" mt-1 mr-2" /> {/* Changed to edit icon */}
							<span> تعديل بيانات الموظف</span>
						</Button>
					</div>
				</Form>
			</main>
		</ConfigProvider>
	);
};

export default EditProfessionnel;
