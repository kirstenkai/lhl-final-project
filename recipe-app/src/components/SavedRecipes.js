import React, { useState } from "react";
import useApplicationData from "../hooks/useApplicationData";


export default function SavedRecipes() {
  const [recipes, setRecipes] = useState();

  useApplicationData().then((res) => { 
    setRecipes(res)
    
  });
  console.log(recipes);
  return (
    <>
      <h1>Saved Recipes</h1>
    <div>{recipes && recipes[0].recipe_name}</div>
    </>
  );
}
