import React, { useState } from "react";
import useApplicationData from "../hooks/useApplicationData";
import RecipeCard from "./RecipeCard";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState();

  useApplicationData().then((res) => {
    setRecipes(res);
  });
  console.log(recipes);

  return (
    <>
      <h1>Saved Recipes</h1>
      <div>
        {recipes &&
          recipes.map((recipe, index) => {
            return (
              <>
                <div key={index}>
                  
                  <h2>{recipe.recipe_name}</h2>
                  <img src={recipe.picture} alt="Product picture" />
                  <div>{recipe.description}</div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
