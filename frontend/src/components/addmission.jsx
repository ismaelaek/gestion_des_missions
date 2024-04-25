import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Select,
	message,
	ConfigProvider,
} from "antd";
import {
	getJuridAppels,
	getJuridPremieres,
} from "../storage/jusridictionsSlice";
import { getProfessionnels } from "../storage/professionnelsSlice";
import { addMission } from "../storage/missionsSlice";
import moment from "moment";
import arEG from "antd/lib/locale/ar_EG";


const AddMission = () => {
	const dispatch = useDispatch();

	const randomNumber = Math.floor(Math.random() * 1000);
	const randomId = randomNumber.toString().padStart(3, "0");
	const [parentId, setParentId] = useState(null);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState("");
	const [form] = Form.useForm();

	const  validateDate = (startDate, endDate) => {
		const start = moment( startDate);
		const end = moment(endDate);

		if (end.isBefore(start)) {
			return false;
		}
		return true;
	}

	const [missionFormData, setMissionFormData] = useState({
		NummeroMission: randomId,
		TypeMission: "",
		DateAller: "",
		DateRetour: "",
		DateEdition: moment().format("YYYY-MM-DD"),
		idEtatMission: 1,
		idProfessionnel: null,
		idJuridiction: null,
	});
	const { juriAppels, juriPremieres, jurIsLoading } = useSelector(
		(state) => state.jusridictions
	);

	const { professionnels, profIsLoading } = useSelector(
		(state) => state.professionnels
	);

	const primeresJuridctions = juriPremieres.filter(
		(juri) => juri.IdJuridictionParent == parentId
	);

	useEffect(() => {
		dispatch(getJuridAppels());
		dispatch(getProfessionnels());
		dispatch(getJuridPremieres());
	}, [dispatch]);
	
	const onFinish = () => {
		if (validateDate(startDate, endDate)) {
			setMissionFormData({
				...missionFormData,
                DateAller: startDate,
                DateRetour: endDate,
			})
			dispatch(addMission(missionFormData));
			form.resetFields();
		} else {
			message.error("! تاريخ الرجوع يجب ان يكون بعد تاريخ الدهاب");
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setMissionFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const profOptions = professionnels.map((professional) => ({
		label: `${professional.nom} ${professional.prenom} - ${professional.NumeroSomme}`,
		value: professional.id,
	}));

	return (
		<ConfigProvider direction="rtl" locale={arEG}>
			<main className="container pt-5 text-right">
				<h1 className="text-4xl text-red-500 mb-3"> : إضافة مهمة</h1>
				<Form form={form} onFinish={onFinish} className="mission-form">
					<div>
						<Form.Item
							name="missionType"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "end", marginBottom: 0 }}
							rules={[
								{ required: true, message: "! الرجاء إدخال نوع المهمة" },
							]}>
							<Input
								style={{ textAlign: "right" }}
								name="TypeMission"
								onChange={handleInputChange}
							/>
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
							<Select
								style={{ textAlign: "right" }}
								onChange={(value) => {
									setParentId(value);
									form.resetFields(["juridection"]);
								}}>
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
							name="juridection"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "end", marginBottom: 0 }}
							rules={[
								{
									required: true,
									message: "! الرجاء اختيار المحكمة الإبتدائية",
								},
							]}>
							{primeresJuridctions.length > 0 ? (
								<Select
									style={{ textAlign: "right" }}
									name="idJuridiction"
									onChange={(value) =>
										setMissionFormData((prevData) => ({
											...prevData,
											idJuridiction: value,
										}))
									}>
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
								<Select disabled={!parentId}></Select>
							)}
						</Form.Item>
						<label htmlFor="primaryCourt">: المحكمة اﻹبتدائية</label>
					</div>

					<div>
						<Form.Item
							name="DateAller"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "end", marginBottom: 0 }}
							rules={[
								{ required: true, message: "! الرجاء اختيار تاريخ الدهاب" },
							]}>
							<DatePicker
								onChange={(date, dateString) => {
									setStartDate(dateString);
								}}
							/>
						</Form.Item>

						<label htmlFor="DateAller">: تاريخ الدهاب</label>
					</div>

					<div>
						<Form.Item
							name="DateRetour"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "end", marginBottom: 0 }}
							rules={[
								{ required: true, message: "! الرجاء اختيار تاريخ الرجوع" },
							]}>
							<DatePicker
								onChange={(date, dateString) => {
									setEndDate(dateString);
								}}
							/>
						</Form.Item>

						<label htmlFor="DateRetour">: تاريخ الرجوع</label>
					</div>
					<div>
						<Form.Item
							name="employee"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "end", marginBottom: 0 }}
							rules={[{ required: true, message: "! الرجاء اختيار الموظف" }]}>
							<Select
								showSearch
								name="idProfessionnel"
								style={{ textAlign: "right" }}
								placeholder="Search to Select"
								optionFilterProp="children"
								onChange={(value) =>
									setMissionFormData((prevData) => ({
										...prevData,
										idProfessionnel: value,
									}))
								}
								filterOption={(input, option) =>
									(option?.label ?? "").includes(input)
								}
								filterSort={(optionA, optionB) =>
									(optionA?.label ?? "")
										.toLowerCase()
										.localeCompare((optionB?.label ?? "").toLowerCase())
								}
								options={profOptions}
							/>
						</Form.Item>
						<label htmlFor="employee">: الموظف</label>
					</div>

					<div>
						<Button
							type="primary"
							htmlType="submit"
							className="w-full submit-btn"
							loading={false}>
							إضافة المهمة
						</Button>
					</div>
				</Form>
			</main>
		</ConfigProvider>
	);
};

export default AddMission;
