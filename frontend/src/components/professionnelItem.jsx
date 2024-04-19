import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCaders } from "../storage/dataSlice";
import { getDirections } from "../storage/dataSlice";


const ProfessionnelItem = ({ object }) => {
    const dispatch = useDispatch();
    const { caders, directions } = useSelector(
        state => state.data
    )
    useEffect(() => {
        dispatch(getCaders());
        dispatch(getDirections());
    }, [])
    const directon = directions.find(
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
			<td>{cader.cadreLibelle_ar}</td>
			<td>{directon.DirLibelle_ar}</td>
			<td>{object.Email}</td>
			<td>{object.prenom}</td>
			<td>{object.nom}</td>
		</tr>
	);
};

export default ProfessionnelItem;
