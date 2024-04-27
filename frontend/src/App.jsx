import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./storage/store";
import Login from "./auth/login";
import Navbar from "./components/navbar";
import AddMission from "./components/addmission";
import AddProfessionnel from "./components/addprofessionel";
import ProfessionnelsList from "./components/professionnelsList";
import MissionsList from "./components/home";
import EditProfessionnel from "./components/editprofessionnel";
import EditMission from "./components/editmissin";
import PDFviewer from "./components/pdfViewer";
import "./App.css";

// resolve conflicts 

function App() {
	const NavBarContainer = () => {
		const location = useLocation();
		if (location.pathname !== "/login")
			return <Navbar />;
	};

	const FooterContaineer= () => {
		const location = useLocation();
		if (location.pathname !== "/login")
			return <p className="footer-container text-center text-xs w-full bg-white px-2 mb-0"
			>
				جميع الحقوق محفوظة © 2023
			</p>;
	};

	return (
		<Provider store={store}>
			<NavBarContainer />
			<Routes>
				<Route path="/" element={<MissionsList />} />
				<Route path="/login" element={<Login />} />
				<Route path="/newmission" element={<AddMission />} />
				<Route path="/view" element={<PDFviewer />} />
				<Route path="/newproffesionnel" element={<AddProfessionnel />} />
				<Route path="/professionnels" element={<ProfessionnelsList />} />
				<Route path="/editproffesionnel/:id" element={<EditProfessionnel />} />
				<Route path="/editmission/:id" element={<EditMission />} />
				<Route path="*" element={<h1>Page Not Found</h1>} />
			</Routes>
			<FooterContaineer />
		</Provider>
	);
}

export default App;
