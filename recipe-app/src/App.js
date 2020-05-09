import React from "react";
import "./App.css";
import Axios from "axios";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from "./components/Header";
import Registration from "./components/Registration";
import LandingPage from './components/LandingPage';
import Search from './components/Search';
import SavedRecipes from './components/SavedRecipes';
import Inventory from './components/Inventory';
import Login from './components/Login';
import NotFound from './components/NotFound';

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

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' component={LandingPage} exact={true}/>
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/search" component={Search} />
          <Route path="/saved" component={SavedRecipes} /> 
          <Route path="/inventory" component={Inventory} />  
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
