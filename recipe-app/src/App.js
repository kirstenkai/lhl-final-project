import React, { useState } from "react";

import Axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Registration from "./components/Registration";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";
import SavedRecipes from "./components/SavedRecipes";
import RecipeCard from "./components/RecipeCard";
import Inventory from "./components/Inventory";
import Login from "./components/Login";
import NotFound from "./components/NotFound";


require('dotenv').config()

function App() {
  const [recipes, setRecipes] = useState([]);

  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message);
  });

  const getRecipe = e => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    setRecipes([]);
    Axios({
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": 
      },
      params: {
        number: "5",
        ranking: "1",
        ignorePantry: "false",

        //1. when clicked on search, setIngredients the array of values listed
        //2. make a function that grabs the ingredients saved in Ingredients state, map
        //  through and with %2C in between each ingredient and save it into a Variable,
        ///  a non-array version = Array.toString()
        //3. below input the value within that variable

        //string escaping- regex
        ingredients: `${recipeName}`
        // ingredients: "apples,flour,sugar"
      }
    })
      .then(response => {
        //1. look at the response, and push the results into an object
        //2. in the Component, render the parts you want from that object and
        //   put in in the list of the pictures
        // 3. in this case, we only want the ID of the recipe, and find (via click of pic
        //    item?)
        //4. make another axios request to get the full detail and instructions of the
        //   full deets of the recipe itself to render on the component / modal
        // console.log(response.data[0]);

        setRecipes(prev => {
          return [...prev, response.data];
        });
      })
      .catch(error => {
        console.log(error);
      });

    // console.log(recipeName);
  };

  const renderInfo = () => {
    console.log("hello");
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={LandingPage} exact={true} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />

          <Route path="/saved" component={SavedRecipes} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/recipecard" component={RecipeCard} />
          <Route
            path="/search"
            render={props => (
              <Search
                {...props}
                getRecipe={getRecipe}
                recipes={recipes}
                renderInfo={renderInfo}
              />
            )}
          />
          <Route path="/saved" component={SavedRecipes} />
          <Route path="/inventory" component={Inventory} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

//random notes

// const [state, setState] = useState({
//   id: 0,
//   title: "",
//   image: ""
// });
