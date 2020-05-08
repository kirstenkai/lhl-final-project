import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import Header from "./components/Header";
import Registration from "./components/Registration";

import Button from "react-bootstrap/Button";

import LandingPage from './components/LandingPage';
import Search from './components/Search';
import SavedRecipes from './components/SavedRecipes';

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
    <div className="App">
      <LandingPage />
      <Search />
      <SavedRecipes />
    </div>
  );
}

export default App;
