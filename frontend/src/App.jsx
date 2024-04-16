import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./auth/login";
import "./App.css";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<h1>Page Not Found</h1>} />
		</Routes>
	);
}

export default App;
