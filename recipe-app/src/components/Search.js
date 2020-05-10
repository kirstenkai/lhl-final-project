import React from "react";

export default function Search({ getRecipe, title, image, recipes }) {
  const nestedRecipes = recipes.flat();
  console.log(recipes);
  return (
    <div>
      <form onSubmit={getRecipe}>
        <input type="text" name="recipeName"></input>
        <button>Search!</button>

        {nestedRecipes.map((recipe, index) => {
          return (
            <div key={index}>
              {recipe.title}
              <img src={recipe.image}></img>
            </div>
          );
        })}
      </form>
    </div>
  );
}

// <Route path="/" component={Search} />} />
