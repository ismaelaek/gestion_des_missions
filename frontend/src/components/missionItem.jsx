import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";
import { deleteMission } from "../storage/missionsSlice";
import { FaEdit, FaTrashAlt, FaPrint } from "react-icons/fa";
import PrintMissiom from "./printMisiion";
import { PDFDownloadLink } from "@react-pdf/renderer";


const MissionItem = ({ object, etats, profs, juridections }) => {
	const dispatch = useDispatch();
	const etat = etats.find((etat) => etat.id === object.idEtatMission);
	const professionnel = profs.find((prof) => prof.id === object.idProfessionnel);
    const jurid = juridections.find(
		(jurid) => jurid.id === object.idJuridiction
	);
	let statusColor;
	switch (object.idEtatMission) {
		case 1:
			statusColor = "bg-red-200"; 
			break;
		case 2:
			statusColor = "bg-yellow-200"; 
			break;
		case 3:
			statusColor = "bg-green-200";
			break;
		case 4:
			statusColor = "bg-gray-200"; 
			break;
		default:
			statusColor = "bg-gray-200"; 
	}
	const handleDelete = () => {
		dispatch(deleteMission(object.id));
	};
	return (
		<tr className=" py-2">
			<td className="flex gap-1">
				<Link to={`/view`}>
					<button className="btn btn-success">
						print
					</button>
				</Link>
				<Link to={`/editmission/${object.id}`}>
					<button className="btn btn-primary">
						<div className=" flex  gap-1">
							<FaEdit className="mt-1" />
							<span>تعديل</span>
						</div>
					</button>
				</Link>
				<Popconfirm
					title="هل أنت متأكد من حذف المهمة؟"
					okText="نعم"
					cancelText="إلغاء"
					onConfirm={handleDelete}>
					<button className="btn btn-danger">
						<div className="flex gap-1">
							<FaTrashAlt className="mt-1" />
							<span>حذف</span>
						</div>
					</button>
				</Popconfirm>
			</td>
			<td className=" text-center text-xs">
				{jurid ? jurid.JurLibelle_ar : "N/A"}
			</td>
			{/* <td class="overflow-hidden">
				<span class="content">{jurid ? jurid.JurLibelle_ar : "N/A"}</span>
			</td> */}
			<td className="flex items-center justify-end gap-2">
				{etat ? etat.EtatLibelle_ar : "N/A"}
				<div className={`${statusColor} w-2 h-2 rounded`}></div>
			</td>
			<td>{professionnel ? professionnel.NumeroSomme : "N/A"}</td>
			{/* <td>{object.DateEdition}</td> */}
			<td className="text-xs">{object.DateRetour}</td>
			<td className="text-xs">{object.DateAller}</td>
			<td>{object.TypeMission}</td>
			<td>{object.NummeroMission}</td>
		</tr>
	);
};

export default MissionItem;
