import { Link } from "react-router-dom";


const ProfessionnelItem = ({ object, directions, caders }) => {
    const direction = directions.find(
			(direct) => direct.id === object.IdDirection
    );
    const cader = caders.find(
            (cader) => cader.id === object.IdCadre
    );
	return (
		<tr>
			<td className=" flex gap-4">
				<Link to={`/editproffesionnel/${object.id}`}>
					<button className="btn btn-primary">تعديل</button>
				</Link>
				<button
					className="btn btn-danger"
					onClick={() => deleteProfessionnel(object.id)}>
					حذف
				</button>
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
