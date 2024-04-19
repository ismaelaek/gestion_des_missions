import { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionnels } from "../storage/professionnelsSlice";
import { SlDrawer } from "react-icons/sl";
import { Link } from 'react-router-dom'
import ProfessionnelItem from "./professionnelItem";


const ProfessionnelsList = () => {
    const dispatch = useDispatch();
    const { professionnels } = useSelector(
        state => state.professionnels
    )

    useEffect(() => {
        dispatch(getProfessionnels());
    }, [dispatch]);

    const Empty = () => {
        return (
					<div className=" container flex flex-col justify-center items-center h-96">
						<h1>لا يوجد موظفين</h1>
						<SlDrawer className=" text-9xl" />
						<span className=" my-3">
							إضغط على <Link to={"/newproffesionnel"}>إضافة موظف</Link> لإضافة
							موظف جديد
						</span>
					</div>
				);
    }
    const ProfList = () => {
        return (
            <table className=" w-full text-right">
            {professionnels.map((profession) => {
					return <ProfessionnelItem object={profession} />;
				})}
            </table>
        )
        
     }
    return (
			<main className=" container  pt-3 text-right">
				{professionnels.length === 0 ? (
					<Empty />
				) : (
					<>
                        <div className=" flex justify-between">
                            <Link to={"/newproffesionnel"}>إضافة موظف</Link>
							<h1 className="text-4xl text-red-500 mb-3">قائمة الموظفين</h1>
						</div>
						{/* <ProfList /> */}
					</>
				)}
			</main>
		);
}


export default ProfessionnelsList;