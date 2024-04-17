import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import Login from "./auth/login";
import Navbar from "./components/navbar";
import AddMission from "./components/addmission";
import AddProfessionnel from "./components/addprofessionel";

import "./App.css";

// resolve conflicts 

function App() {
	const NavBarContainer = () => {
		const location = useLocation();
		if (location.pathname !== "/login")
			return <Navbar />;
	};

	return (
		<>	
			<NavBarContainer />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/newmission" element={<AddMission />} />
				<Route path="/newproffesionnel" element={<AddProfessionnel />} />
				<Route path="*" element={<h1>Page Not Found</h1>} />
			</Routes>
		</>
	);
}

export default App;
