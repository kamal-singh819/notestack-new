import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GrDocumentNotes } from "react-icons/gr";
import userProfile from "../../assets/navImages/userProfile.jpg";

const pages = [
  { name: "Home", route: "/" },
  { name: "Notes", route: "/notes" },
  { name: "About", route: "/about" },
  { name: "Login", route: "/login" },
];
const settings = [
  { name: "Profile", route: "/profile" },
  { name: "Account", route: "/account" },
  { name: "Dashboard", route: "/dashboard" },
  { name: "Logout" },
];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [currentPage, setCurrentPage] = useState("/");
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;

  const handleClickLogo = () => {
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    if (info && info.accessToken) setAnchorElUser(event.currentTarget);
    else {
      navigate("/login");
      setCurrentPage("/login");
    }
  };

  const handleCloseNavMenu = (route) => {
    console.log(route);
    if (route) {
      navigate(route);
      setCurrentPage(route);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting.name === "Logout") {
      localStorage.removeItem("userInfo");
      navigate("/");
    } else navigate(setting.route);
    setAnchorElUser(null);
  };

  return (
    <nav className="flex items-center p-2 sm:px-5 bg-[#023047]">
      <div
        onClick={handleClickLogo}
        className="flex items-center gap-2 md:mr-8 cursor-pointer"
      >
        <GrDocumentNotes className="text-white" />
        <h3 className="text-white font-bold">NOTESTACK</h3>
      </div>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon className="text-white" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => {
            if (page.name === "Login" && userInfo) return;
            else
              return (
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.route)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              );
          })}
        </Menu>
      </Box>
      <Box
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: "1.5rem" }}
      >
        {pages.map((page) => {
          if (page.name === "Login" && userInfo) return;
          else
            return (
              <button
                key={page.name}
                className={`text-white  border-b-2 ${
                  currentPage === page.route
                    ? "border-white"
                    : "border-[#023047]"
                } hover:border-white ease-linear duration-300`}
                onClick={() => handleCloseNavMenu(page.route)}
              >
                {page.name}
              </button>
            );
        })}
      </Box>
      <input
        type="search"
        placeholder="Search..."
        className="flex-1 px-1 sm:px-5 py-1 bg-[#4a4e69] rounded-md outline-none mx-3 min-w-[4.5rem]"
      />
      <div className="">
        <div className="h-[3rem] w-[3rem] rounded-full overflow-hidden">
          <img
            onClick={handleOpenUserMenu}
            src={userProfile}
            alt=""
            className="w-[100%] h-[100%] cursor-pointer"
          />
        </div>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting.name}
              onClick={() => handleCloseUserMenu(setting)}
            >
              <Typography textAlign="center">{setting.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </nav>
  );
}
export default Navbar;
