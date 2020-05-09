import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
     <div>
       <h1><a href="/">RecipeApp</a></h1>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/registration">Sign Up</NavLink>
    </div>
  );
};

export { Header as default };
