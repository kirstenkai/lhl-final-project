// import React from "react";
import { NavLink } from "react-router-dom";

// const Header = () => {
//   return (
//      <div>
//        <h1><a href="/">RecipeApp</a></h1>
//       <NavLink to="/login">Log In</NavLink>
//       <NavLink to="/registration">Sign Up</NavLink>
//     </div>
//   );
// };

// export { Header as default };


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <NavLink to="/" className={classes.title}>
            RecipeApp
          </NavLink>
          <NavLink to="/login" color="inherit">Login</NavLink>
          <NavLink to="/registration" color="inherit">Sign Up</NavLink>

        </Toolbar>
      </AppBar>
    </div>
  );
}
