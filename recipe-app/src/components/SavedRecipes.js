import React, { useState, useEffect } from "react";

import axios from "axios";
import RecipeCard from "./RecipeCard";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios.get("/api/saved").then((res) => {
      console.log(res.data)
      setRecipes((prev) => {
        return [...prev, ...res.data];
      });
    });
  }, []);

  return (
    <div>
      {recipes.map((recipe, index) => {
        return (
        <div key={index}>
          {/* I used RecipeCard component to render saved recipes from DB! */}
          <RecipeCard 
        title={recipe.title}
        image={recipe.image}
        id={recipe.spoonacular_id}
        />
        </div>
        );
      })}
    </div>
  );
}
