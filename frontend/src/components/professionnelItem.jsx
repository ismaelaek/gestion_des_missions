import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";
import { deleteProfessionnel } from "../storage/professionnelsSlice";

const ProfessionnelItem = ({ object, directions, caders }) => {
	const dispatch = useDispatch();
	const direction = directions.find(
		(direct) => direct.id === object.IdDirection
	);
	const cader = caders.find((cader) => cader.id === object.IdCadre);
	const handleDelete = () => {
		dispatch(deleteProfessionnel(object.id));
	};
	return (
		<tr>
			<td className="flex gap-4">
				<Link to={`/editproffesionnel/${object.id}`}>
					<button className="btn btn-primary">تعديل</button>
				</Link>
				<Popconfirm
					title="هل أنت متأكد من حذف الموظف؟"
					okText="نعم"
					cancelText="إلغاء"
					onConfirm={handleDelete}>
					<button className="btn btn-danger">حذف</button>
				</Popconfirm>
			</td>
			<td>{cader ? cader.cadreLibelle_ar : "N/A"}</td>
			<td>{direction ? direction.DirLibelle_ar : "N/A"}</td>
			<td>{object.Email}</td>
			<td>{object.prenom}</td>
			<td>{object.nom}</td>
		</tr>
	);
};

export default ProfessionnelItem;
