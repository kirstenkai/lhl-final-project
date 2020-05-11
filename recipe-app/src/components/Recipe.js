import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "react-modal";

require("dotenv").config();
const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;

const Recipe = props => {
  const [state, setState] = useState([]);

  const id = props.location.state.recipe;
  console.log("id: ", id);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": `${SPOONACULAR_API}`,
        useQueryString: true
      }
    })
      .then(response => {
        console.log("response: ", response.data);
        setState(prev => {
          return [...prev, response];
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {state.map((recipes, index) => {
        const recipe = recipes.data;
        return (
          <div key={index}>
            <h3>Title: {recipe.title}</h3>
            <img src={recipe.image}></img>
            <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />

            <p>Preparation time: {recipe.readyInMinutes} minutes</p>
            <p>Serving: {recipe.servings}</p>
            <span>
              Source URL:
              <a href={recipe.sourceUrl}> {recipe.sourceUrl}</a>
            </span>
            {recipe.instructions && <p>Instructions: {recipe.instructions}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default Recipe;

// <div>
// <h3>Title: {recipe.title}</h3>
// <img src={recipe.image}></img>
// {recipe.summary}
// <p>Preparation time: {recipe.readyInMinutes} minutes</p>
// <p>Serving: {recipe.servings}</p>
// <span>
//   <a href={recipe.sourceUrl}> Source URL: {recipe.sourceUrl}</a>
// </span>

// <p>Instructions: {recipe.instructions}</p>
// </div>

// class Recipe extends React.Component {
//   state = {
//     activeRecipe: []
//   };

//   componentDidMount = async () => {
//     const id = this.props.location.state.recipe;
//     console.log("id::::", id);
//     Axios({
//       method: "GET",
//       url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
//       headers: {
//         "content-type": "application/octet-stream",
//         "x-rapidapi-host":
//           "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//         "x-rapidapi-key": "8e58753bbdmshc4258aeb5e189b2p134b94jsn6fec77643a52",
//         useQueryString: true
//       }
//     })
//       .then(response => {
//         console.log("instruuuuctions====", response.data.instructions);
//         this.setState({ activeRecipe: response.data });
//         console.log("state: ", this.state);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   render() {
//     const recipe = this.state.activeRecipe;
//     return (
//       <div>
//         <h3>Title: {recipe.title}</h3>
//         <img src={recipe.image}></img>
//         {recipe.summary}
//         <p>Preparation time: {recipe.readyInMinutes} minutes</p>
//         <p>Serving: {recipe.servings}</p>
//         <span>
//           <a href={recipe.sourceUrl}> Source URL: {recipe.sourceUrl}</a>
//         </span>

//         <p>Instructions: {recipe.instructions}</p>
//       </div>
//     );
//   }
// }

// export default Recipe;
