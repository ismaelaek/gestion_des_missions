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
import { getMissions , updateMission} from "../storage/missionsSlice";
import { useNavigate, useParams } from "react-router-dom";
import arEG from "antd/lib/locale/ar_EG";
import moment from "moment";
import { getEtats } from "../storage/dataSlice";

const EditMission = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
    const { id } = useParams();
	const [form] = Form.useForm();

	useEffect(() => {
		dispatch(getEtats());
		dispatch(getMissions());
		dispatch(getJuridAppels());
		dispatch(getProfessionnels());
		dispatch(getJuridPremieres());
		if (!mission) {
			navigate('/')
		}
	}, [dispatch]);
    
    const { missions} = useSelector(
        (state) => state.missions
    );
	const mission = missions.find((mission) => mission.id == id);
    const [parentId, setParentId] = useState(11);
	
	const { juriAppels, juriPremieres, jurIsLoading } = useSelector(
        (state) => state.jusridictions
    );
    
    const lastJuri = juriPremieres.find(
			(juri) => juri.id == mission.idJuridiction
    );
    const initialParent = lastJuri?.IdJuridictionParent;

	const { professionnels, profIsLoading } = useSelector(
		(state) => state.professionnels
    );
    const validateDate = (startDate, endDate) => {
			const start = moment(startDate);
			const end = moment(endDate);

			if (end.isBefore(start)) {
				return false;
			}
			return true;
		};

	const primeresJuridctions = juriPremieres.filter(
		(juri) => juri.IdJuridictionParent == parentId
	);
	
	const { etatsMissions } = useSelector(state => state.data); 


    const [missionFormData, setMissionFormData] = useState({
			id: parseInt(id),
			NummeroMission: mission?.NummeroMission,
			TypeMission: mission?.TypeMission,
			DateAller: mission?.DateAller,
			DateRetour: mission?.DateRetour,
			DateEdition: mission?.DateEdition,
			idEtatMission: mission?.idEtatMission,
			idProfessionnel: mission?.idProfessionnel,
			idJuridiction: mission?.idJuridiction,
		});
    
	const onFinish = () => {
		if (validateDate(missionFormData.DateAller, missionFormData.DateRetour)) {
			dispatch(updateMission(missionFormData));
			navigate('/');
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

	return (
		<ConfigProvider direction="rtl" locale={arEG}>
			<main className="container pt-5 text-right">
				<h1 className="text-4xl text-red-500 mb-3"> : تعديل بيانات مهمة</h1>
				<Form form={form} onFinish={onFinish} className="mission-form">
					<div>
						<Form.Item
							name="missionType"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "end", marginBottom: 0 }}
							initialValue={missionFormData.TypeMission}
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
							name="etat"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "end", marginBottom: 0 }}
							initialValue={mission?.idEtatMission}
							rules={[{ required: true, message: "! الرجاء اختيار الحالة" }]}>
							<Select
								style={{ textAlign: "right" }}
								name="idEtatMission"
								onChange={(value) =>
									setMissionFormData((prevData) => ({
										...prevData,
										idEtatMission: value,
									}))
								}>
								{etatsMissions.map((etat) => {
									return (
										<Select.Option key={etat.id} value={etat.id}>
											{etat.EtatLibelle_ar}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>
						<label htmlFor="employee">: حالة المهمة</label>
					</div>

					<div>
						<Form.Item
							name="appealCourt"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "end", marginBottom: 0 }}
							initialValue={initialParent}
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
							initialValue={missionFormData.idJuridiction}
							rules={[
								{
									required: true,
									message: "! الرجاء اختيار المحكمة الإبتدائية",
								},
							]}>
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
						</Form.Item>
						<label htmlFor="primaryCourt">: المحكمة اﻹبتدائية</label>
					</div>

					<div className="dateinput">
						<Form.Item
							name="DateAller"
							wrapperCol={{ span: 24 }}
							initialValue={mission?.DateAller}
							style={{ textAlign: "end", marginBottom: 0 }}
							rules={[
								{ required: true, message: "! الرجاء اختيار تاريخ الدهاب" },
							]}>
							<input
								type="date"
								name="DateAller"
								onChange={(e) =>
									setMissionFormData({
										...missionFormData,
										DateAller: e.target.value,
									})
								}
							/>
						</Form.Item>

						<label htmlFor="DateAller">: تاريخ الدهاب</label>
					</div>

					<div className="dateinput">
						<Form.Item
							name="DateRetour"
							wrapperCol={{ span: 24 }}
							initialValue={mission?.DateRetour}
							style={{ textAlign: "end", marginBottom: 0 }}
							rules={[
								{ required: true, message: "! الرجاء اختيار تاريخ الرجوع" },
							]}>
							<input
								type="date"
								name="DateRetour"
								onChange={(e) =>
									setMissionFormData({
										...missionFormData,
										DateRetour: e.target.value,
									})
								}
							/>
						</Form.Item>

						<label htmlFor="DateRetour">: تاريخ الرجوع</label>
					</div>

					<div>
						<Form.Item
							name="employee"
							wrapperCol={{ span: 24 }}
							style={{ textAlign: "end", marginBottom: 0 }}
							initialValue={missionFormData.idProfessionnel}
							rules={[{ required: true, message: "! الرجاء اختيار الموظف" }]}>
							<Select
								style={{ textAlign: "right" }}
								name="idProfessionnel"
								onChange={(value) =>
									setMissionFormData((prevData) => ({
										...prevData,
										idProfessionnel: value,
									}))
								}>
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
							type=" btn btn-success"
							htmlType="submit"
							className="w-full submit-btn">
							تعديل المهمة
						</Button>
					</div>
				</Form>
			</main>
		</ConfigProvider>
	);
};

export default EditMission;
