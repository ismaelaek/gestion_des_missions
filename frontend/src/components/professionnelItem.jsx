import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";
import { deleteProfessionnel } from "../storage/professionnelsSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";


const ProfessionnelItem = ({ object, caders }) => {
	const dispatch = useDispatch();
	const cader = caders.find((cader) => cader.id === object.IdCadre);
	const handleDelete = () => {
		dispatch(deleteProfessionnel(object.id));
	};
	return (
		<tr>
			<td className="flex gap-4">
				<Link to={`/editproffesionnel/${object.id}`}>
					<button className="btn btn-primary">
						<div className=" flex  gap-1">
							<FaEdit className="mt-1" />
							<span>تعديل</span>
						</div>
					</button>
				</Link>
				<Popconfirm
					title="هل أنت متأكد من حذف الموظف؟"
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
			<td>{cader ? cader.cadreLibelle_ar : "N/A"}</td>
			<td>{object.NumeroSomme}</td>
			<td>{object.Email}</td>
			<td>{object.prenom}</td>
			<td>{object.nom}</td>
		</tr>
	);
};

export default ProfessionnelItem;
