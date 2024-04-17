import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import Login from "./auth/login";
import Navbar from "./components/navbar";
import "./App.css";

function App() {
	const NavBarContainer = () => {
		const location = useLocation();
		if (location.pathname !== "/login")
			return <Navbar />;
	};

	return (<>
		<NavBarContainer />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<h1>Page Not Found</h1>} />
		</Routes>
	</>
	);
}

export default App;
