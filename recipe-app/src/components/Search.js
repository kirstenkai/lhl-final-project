import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";

require("dotenv").config();
const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;

export default function Search({ renderInfo }) {
  const [recipes, setRecipes] = useState([]);
  // console.log(recipes[0])
  const getRecipe = e => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    setRecipes([]);
    axios({
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": `${SPOONACULAR_API}`
      },
      params: {
        number: "20",
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
        console.log(recipes);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const nestedRecipes = recipes.flat();
  return (
    <div>
      <form onSubmit={getRecipe}>
        <input type="text" name="recipeName"></input>
        <button>Search!</button>

        {nestedRecipes.map((recipe, index) => {
          console.log("recipe name: ", recipe.title);
          return (
            <div key={index}>
              <RecipeCard
                title={recipe.title}
                image={recipe.image}
                id={recipe.id}
              />
            </div>
          );
        })}
      </form>
    </div>
  );
}

// <Route path="/" component={Search} />} />

// import React from "react";
// import RecipeCard from "./RecipeCard"

// export default function Search({ getRecipe, recipes, renderInfo }) {
//   const nestedRecipes = recipes.flat();
//   console.log(recipes);
//   return (
//     <div>
//       <form onSubmit={getRecipe}>
//         <input type="text" name="recipeName"></input>
//         <button>Search!</button>

//         {nestedRecipes.map((recipe, index) => {
//           return (
//             <div key={index}>
//               {recipe.title}
//               <img
//                 className="button"
//                 onClick={renderInfo}
//                 src={recipe.image}
//               ></img>
//             </div>
//           );
//         })}
//       </form>
//     </div>
//   );
// }
