import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { message } from 'antd';
import MJMarocLogo from "../assets/MJ-Maroc.png";
import '../styles/login.css';


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
	const [validationErrors, setValidationErrors] = useState({});

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
			console.log(response.data);

			localStorage.setItem("token", response.data.token);
			localStorage.setItem("user", JSON.stringify(response.data.user));

			message.success("Login Successful");

			navigate("/");

		} catch (error) {
			if (error.response && error.response.status === 401) {
				message.error(
					"Invalid email or password. Please try again."
				);
			} else {
				const responseData = error.response.data;
				setValidationErrors(responseData);
				if (responseData) {
					setValidationErrors(responseData);
				} else {
					Swal.fire({
						icon: "error",
						title: "Error",
						text: responseData || "Registration failed.",
					});
				}
			}
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
							{validationErrors.email && (
								<span className="text-danger">{validationErrors.email[0]}</span>
							)}
						</div>
						<div className="form-outline mb-4">
							<input
								type="password"
								name="password"
								placeholder="كلمة السر"
								className="form-control"
								onChange={handleChange}
							/>
							{validationErrors.password && (
								<span className="text-danger">
									{validationErrors.password[0]}
								</span>
							)}
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
