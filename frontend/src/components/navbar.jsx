import { useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MJLogo from '../assets/MJ-Maroc.png'
import { Link, NavLink } from 'react-router-dom';

const pages = [
	{ title: "لائحة الموظفين", path: "proffesionnels" },
	{ title: "اضافة موظف", path: "newproffesionnel" },
	{ title: "اضافة مهمة", path: "newmission" },
];
const settings = ["تسجيل الخروج"];

function Navbar() {
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

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="" />
							</IconButton>
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
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="right">{setting}</Typography>
								</MenuItem>
							))}
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
							<div className=" flex flex-col px-4">
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
								className="nav-item text-white no-underline ml-3">
								{page.title}
							</NavLink>
						))}
					</Box>
					<Link to='/'>
						<img src={MJLogo} alt="Ministre of Justice logo" width={40} />
					</Link>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;
