import * as React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingBag } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function NavBar({ searchTerm, setSearchTerm}) {

  const navigate = useNavigate();

  const userId = localStorage.getItem('userId')

  const location = useLocation();
  const path = location.pathname;
  const inGamestore = path === "/store" || path === "/store/"; //used to get the path to conditionally render search bar in store
  //in the serach bar in the game store

  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; //Added by Appbar component in MUI

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/account/login');
};
  const [hasCart, setHasCart] = React.useState(false)
  let cartInStore = hasCart && inGamestore;
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [userName, setUserName] = React.useState("")
  
  const API_URL = "https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/users"

  useEffect(() => {
    const fetchAccount = async () => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem("userId")
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch account details');
            }
            const accountData = await response.json();
            setUserName(accountData.username)
            if (accountData.cart) {
                if (accountData.cart.games.length > 0) {
                    setHasCart(true)
                }
                console.log(accountData.cart)
            } else {
                setHasCart(false)
            }
            setAuth(true)
            setLoading(false);
        } catch (error) {
            setError(error);
            setAuth(false)
            setLoading(false);
            console.log('not logged in')
        }
    };
    fetchAccount();
}, []);

  return (
    <Box sx={{ display: "flex" }}
    height="64px"
    >
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Triple J Gamestore
            </Link>
          </Typography>
          {inGamestore && (
            <>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Search>
            </>
          )}
          {auth && (
            <div>
              {cartInStore && (              
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Link to="/account/cart"> <ShoppingBag /> </Link>
              </IconButton>
              )}
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <h6>{userName}</h6>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate(`/account/${userId}`)}>My account</MenuItem>
                <MenuItem onClick={() => navigate("/account/cart")}>Cart</MenuItem>
                <MenuItem onClick={() => navigate("/account/history")}>Purchase History</MenuItem>
                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
NavBar.propTypes = {
  setSearchTerm: PropTypes.func,
  searchTerm: PropTypes.string,
  setFilterType: PropTypes.func,
  filterType: PropTypes.string,
};
export default NavBar;
