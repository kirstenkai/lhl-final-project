import React from "react";
import RecipeCard from "./RecipeCard";

export default function Search({ getRecipe, recipes, renderInfo }) {
  const nestedRecipes = recipes.flat();
  console.log(recipes);
  return (
    <div>
      <form onSubmit={getRecipe}>
        <input type="text" name="recipeName"></input>
        <button>Search!</button>

        {nestedRecipes.map((recipe, index) => {
          return (
            <RecipeCard
              renderInfo={renderInfo}
              key={index}
              title={recipe.title}
              image={recipe.image}
            />
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
