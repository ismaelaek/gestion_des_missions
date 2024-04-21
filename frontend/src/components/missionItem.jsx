import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";
import { deleteMission } from "../storage/missionsSlice";
const MissionItem = ({ object, etats, profs, juridections }) => {
	const dispatch = useDispatch();
	const etat = etats.find((etat) => etat.id === object.idEtatMission);
	
	// TODO resolve err 404 on getting "etat"

	const professionnel = profs.find((prof) => prof.id === object.idProfessionnel);
    const jurid = juridections.find(
		(jurid) => jurid.id === object.idJuridiction
	);

	const handleDelete = () => {
		dispatch(deleteMission(object.id));
	};
	return (
		<tr>
			<td className="flex gap-4">
				<Link to={`/editproffesionnel/${object.id}`}>
					<button className="btn btn-success bg-green-500">طـبع</button>
				</Link>
				<Link to={`/editproffesionnel/${object.id}`}>
					<button className="btn btn-primary">تعديل</button>
				</Link>
				<Popconfirm
					title="هل أنت متأكد من حذف المهمة؟"
					okText="نعم"
					cancelText="إلغاء"
					onConfirm={handleDelete}>
					<button className="btn btn-danger">حذف</button>
				</Popconfirm>
			</td>
			<td>{jurid ? jurid.JurLibelle_ar : "N/A"}</td>
			<td>{etat ? etat.EtatLibelle_ar : "N/A"}</td>
			<td>{professionnel ? professionnel.NumeroSomme : "N/A"}</td>
			<td>{object.DateEdition}</td>
			<td>{object.DateRetour}</td>
			<td>{object.DateAller}</td>
			<td>{object.TypeMission}</td>
			<td>{object.NummeroMission}</td>
		</tr>
	);
};

export default MissionItem;
