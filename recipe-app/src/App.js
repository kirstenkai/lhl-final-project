import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import Login from "./components/Login"
import Inventory from "./components/Inventory"




function App(props) {
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
  <>
      <Login></Login>
    
      <Inventory></Inventory>
        
  </>
    
  );
}

export default App;
