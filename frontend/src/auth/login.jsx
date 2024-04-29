import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import MJMarocLogo from "../assets/MJ-Maroc.png";
import '../styles/login.css';
import Cookies from 'js-cookie';


const Login = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/");
		}
	}, [navigate]);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/auth/login",
				formData
			);

			Cookies.set("token", response.data.token, { expires: 7, secure: true });
			localStorage.setItem("user", JSON.stringify(response.data.user));

			message.success("Login Successful");

			navigate("/");

		} catch (error) {
			message.error(
				"Invalid email or password. Please try again."
			);
			message.error(error.message);
		}
	};

	return (
		<section className="vh-100 flex items-center p-8  ">
			<div className="card w-2/4" style={{ borderRadius: "15px" }}>
				<div className="card-body p-5">
					<div className=" w-full flex justify-center pb-8">
						<img src={MJMarocLogo} alt="" width={80} />
					</div>
					<form method="POST" onSubmit={handleSubmit}  >
						<div className="form-outline mb-4">
							<input
								type="text"
								name="email"
								placeholder="البريد الالكتروني"
								className="form-control"
								onChange={handleChange}
							/>
						</div>
						<div className="form-outline mb-4">
							<input
								type="password"
								name="password"
								placeholder="كلمة السر"
								className="form-control"
								onChange={handleChange}
							/>
						</div>
						<button type="submit" className="btn btn-primary mt-4 w-full">
							دخول
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
