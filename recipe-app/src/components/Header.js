import React, { useState, Fragment } from 'react';
import { NavLink, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


// New - importing useAuth0 
import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#232946',
    boxShadow: "none"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#fffffe",
    textDecoration: "none",
    fontSize: "30px",
    fontWeight: "bold"
  },
  navLink: {
    color: "#fffffe", 
    textDecoration: "none",
    textTransform: "uppercase",
    padding: theme.spacing(0, 1)
  },
  mobileMenu: {
    color: "#000",
    textDecoration: "none",
    textTransform: "uppercase",
  },
}));


export default function ButtonAppBar() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  
  const[anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <NavLink to="/" className={classes.title}>
            RecipeApp
          </NavLink>
          {!isAuthenticated && (
            <Button style={{color: "#fffffe", fontWeight: "bold"}} onClick={() => loginWithRedirect({})}>Log in</Button>
            )}

          {/* NEW - add a link to the home and profile pages */}
          {isAuthenticated && (
            <span>
          <Hidden smDown implementation="css">
              <Link to="/inventory" className={classes.navLink}>Inventory</Link>&nbsp;
              <Link to="/saved" className={classes.navLink}>Saved Recipes</Link>
              <Link to="/profile" className={classes.navLink}>Profile</Link>
              <Link to="/create" className={classes.navLink}>Create Recipe</Link>
          </Hidden>
            </span>
          )}
          {isAuthenticated && (
            <Fragment>
          <Button className={classes.navLink} onClick={() => logout()}>
            Log out
          </Button>

          <Hidden mdUp implementation="css">
          <IconButton 
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.navLink}>
              <MenuIcon />
          </IconButton>
          <Menu
            id="mobile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={handleClose}>
              <a href="/inventory" className={classes.mobileMenu}>
                Inventory
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="/saved" className={classes.mobileMenu}>
                Saved Recipes
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="/create" className={classes.mobileMenu}>
                Create Recipes
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="/search" className={classes.mobileMenu}>
                Search
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="/profile" className={classes.mobileMenu}>
                Profile
              </a>
            </MenuItem>
          </Menu>
          </Hidden>
          </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
