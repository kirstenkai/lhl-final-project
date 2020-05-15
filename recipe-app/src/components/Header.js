import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

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
}));

// TO DO: 
// Look into conditional style rendering 
// Apply Roboto font to everything
export default function ButtonAppBar() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
              <Link to="/inventory" className={classes.navLink}>Inventory</Link>&nbsp;
              <Link to="/saved" className={classes.navLink}>Saved Recipes</Link>
              <Link to="/profile" className={classes.navLink}>Profile</Link>
              <Link to="/create" className={classes.navLink}>Create Recipe</Link>
              <Link to="/search" className={classes.navLink}>Search</Link>
            </span>
          )}
          {isAuthenticated && <Button className={classes.navLink} onClick={() => logout()}>Log out</Button>}
          {/* <NavLink to="/login" color="inherit">Login</NavLink> */}
          {/* <NavLink to="/registration" color="inherit">Sign Up</NavLink> */}

        </Toolbar>
      </AppBar>
    </div>
  );
}
