import { useState, useEffect } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MJLogo from '../assets/MJ-Maroc.png'
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const pages = [
	{ title: "لائحة الموظفين", path: "professionnels" },
	{ title: "اضافة موظف", path: "newproffesionnel" },
	{ title: "اضافة مهمة", path: "newmission" },
	{ title: "الرئيسية", path: "" },
];

function Navbar() {
	const navigate = useNavigate();	
	const [loggedUser, setLoggedUser] = useState({});

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
		}
		else {
			const user = JSON.parse(localStorage.getItem("user"));
            setLoggedUser(user);
		}
	}, [navigate]);



	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		window.location.reload();
	}

	return (
		<nav className=''>
			<span >
				نظــام إدارة المهـــــام
			</span>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip>
								<Typography
									onClick={handleOpenUserMenu}
									variant="subtitle1"
									sx={{ ml: 1, color: "white", cursor: "pointer" }}>
									{`${loggedUser.nom} ${loggedUser.prenom}`}
								</Typography>
							</Tooltip>

							<Menu
								sx={{ mt: "45px", justifyContent: "right" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="right" onClick={handleLogout}>
										LogOut
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex", md: "none", justifyContent: "right" },
							}}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit">
								<MenuIcon />
							</IconButton>
							{/* mobile menu */}
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}>
								<div className=" flex bg-red-300 ml-7 px-4">
									{pages.map((page, index) => (
										<NavLink
											key={index}
											to={page.path}
											className=" no-underline my-1"
											onClick={handleCloseNavMenu}>
											{page.title}
										</NavLink>
									))}
								</div>
							</Menu>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex", justifyContent: "right" },
								mr: 4,
							}}>
							{pages.map((page, index) => (
								<NavLink
									key={index}
									onClick={handleCloseNavMenu}
									to={page.path}
									className="nav-item text-white no-underline ml-10">
									{page.title}
								</NavLink>
							))}
						</Box>
						<Link to="/">
							<img src={MJLogo} alt="Ministre of Justice logo" width={50}  className=' mr-8'/>
						</Link>
					</Toolbar>
				</Container>
			</AppBar>
		</nav>
	);
}
export default Navbar;
