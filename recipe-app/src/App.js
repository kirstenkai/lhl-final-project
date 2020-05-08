import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import Header from "./components/Header";
import Registration from "./components/Registration";

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
      <Header />
      <Registration />
    </div>
  );
}

export default App;
