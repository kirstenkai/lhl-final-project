import React from "react";
import Axios from "axios";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";
import SavedRecipes from "./components/SavedRecipes";
import Inventory from "./components/Inventory";
import CreateRecipe from "./components/CreateRecipe";
import NotFound from "./components/NotFound";
import logo from "./components/foodloading2.gif";
import CssBaseline from "@material-ui/core/CssBaseline";
// NEW - login/register functionality. Importing useAuth0 hook
import { useAuth0 } from "./react-auth0-spa";
// New - import profile page component
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
require("dotenv").config();

const useStyles = makeStyles({
  logo: {
    height: "500px",
    width: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "30%",
    marginTop: "12%",
  },
});
function App() {
  const classes = useStyles();
  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res.data.message);
  });
  const { loading, isAuthenticated } = useAuth0();
  if (loading) {
    return <img className={classes.logo} src={logo} alt="loading..."></img>;
  }
  return (
    <Router history={history}>
      <div className="App">
        <CssBaseline />
        <header>
          <Header />
        </header>
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/search" /> : <LandingPage />}
          </Route>
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
