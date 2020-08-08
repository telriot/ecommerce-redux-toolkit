import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthorizedUser,
  openedAuthDialog,
} from "../features/auth/authSlice";
import CartIcon from "../features/cart/CartIcon";
import AuthDialog from "../features/auth/AuthDialog";
import SearchInput from "./SearchInput";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {},
  searchDiv: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
}));

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector(selectAuthorizedUser);
  const handleLogin = async () => {
    dispatch(openedAuthDialog());
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    window.open("http://localhost:5000/api/auth/logout", "_self");
  };

  const loggedMenuItems = [
    { title: "Dashboard", link: "/dashboard", action: null },
    { title: "Logout", link: null, action: handleLogout },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Shopping Cart</Link>
          </Typography>
          <div className={classes.searchDiv}>
            <SearchInput />
          </div>

          <CartIcon />

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
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            {Boolean(user._id) ? (
              loggedMenuItems.map((item, index) => (
                <MenuItem key={`menuitem-${index}`} onClick={item.action}>
                  {item.link ? (
                    <Link to={item.link}>{item.title}</Link>
                  ) : (
                    item.title
                  )}
                </MenuItem>
              ))
            ) : (
              <MenuItem onClick={handleLogin}>Login</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <AuthDialog />
    </div>
  );
}

export default Navbar;
