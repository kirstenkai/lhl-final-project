import React, { useState } from "react";

import Axios from "axios";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Registration from "./components/Registration";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";
import SavedRecipes from "./components/SavedRecipes";
import RecipeCard from "./components/RecipeCard";
import Inventory from "./components/Inventory";
import Login from "./components/Login";
import CreateRecipe from "./components/CreateRecipe";
import NotFound from "./components/NotFound";
import logo from "./components/nezuko.gif";

import Recipe from "./components/Recipe";

// NEW - login/register functionality. Importing useAuth0 hook
import { useAuth0 } from "./react-auth0-spa";

// New - import profile page component
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";

require("dotenv").config();
const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;

function App() {
  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message);
  });

  const { loading, isAuthenticated } = useAuth0();

  if (loading) {
    return <img src={logo} alt="loading..."></img>;
  }

  return (
    <Router history={history}>
      <div className="App">
        <header>
          <Header />
        </header>
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/search" /> : <LandingPage />}
          </Route>
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/inventory" component={Inventory} />
          <PrivateRoute path="/saved" component={SavedRecipes} />
          <PrivateRoute path="/inventory" component={Inventory} />
          <PrivateRoute path="/create" component={CreateRecipe} />
          <PrivateRoute to="/search" component={Search} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//random notes

// const [state, setState] = useState({
//   id: 0,
//   title: "",
//   image: ""
// });

// feature/spoonacular-second-api-call
