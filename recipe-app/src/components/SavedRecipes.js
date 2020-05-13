import React, { useState, useEffect } from "react";

import axios from "axios";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios.get("/api/saved").then((response) => {
      // console.log(response.data)
      setRecipes((prev) => {
        return [...prev, ...response.data];
      });
    });
  }, []);

  return (
    <div>
      {recipes.map((recipe, index) => {
        return <div key={index}> {recipe.recipe_name}</div>;
      })}
    </div>
  );
}
