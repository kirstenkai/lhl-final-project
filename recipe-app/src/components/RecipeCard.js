import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Axios from "axios";
import { FacebookShareButton } from "react-share";
import { FacebookIcon } from "react-share";
import ReactToPrint from "react-to-print";

import Modal from "react-modal";

require("dotenv").config();
const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function RecipeCard({ image, title, id }) {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const [state, setState] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const componentRef = useRef();

  Modal.setAppElement("#root");

  const renderInfo = e => {
    e.preventDefault();
    setIsOpen(true);
    setCurrentId(id);
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
        setState(prev => {
          return [...prev, response];
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <CardMedia
            component="img"
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
          />

          <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <div>
              {state.map((recipes, index) => {
                const recipe = recipes.data;
                {
                  console.log("REECIPE: ", recipe);
                }
                return (
                  <div key={index}>
                    <h3>Title: {recipe.title}</h3>
                    <img src={recipe.image}></img>
                    <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                    <p>{recipe.id}</p>
                    <h2> Preparation time:</h2>
                    <div>{<h3>{recipe.readyInMinutes} minutes</h3>} </div>
                    <h2>Serving: </h2>

                    {recipe.servings === 1 ? (
                      <h3>{recipe.servings} person</h3>
                    ) : (
                      <h3> {recipe.servings} people</h3>
                    )}
                    <span>
                      <h2>Source URL:</h2>
                      <a href={recipe.sourceUrl}>
                        {" "}
                        {<p>{recipe.sourceUrl}</p>}
                      </a>
                    </span>
                    <h2>Required Ingredients</h2>
                    {recipe.extendedIngredients &&
                      recipe.extendedIngredients.map((ingredient, index) => {
                        return (
                          <div key={index}>
                            {<h3>☞ {ingredient.original}</h3>}
                          </div>
                        );
                      })}
                    <h2>Instructions</h2>
                    {recipe.analyzedInstructions &&
                      recipe.analyzedInstructions.map((instruction, index) => {
                        return instruction.steps.map((key2, index) => {
                          return (
                            <div key={index}>
                              <ol>
                                {" "}
                                {index + 1}. {key2.step}
                              </ol>
                            </div>
                          );
                        });
                      })}
                    <FacebookShareButton
                      url={recipe.sourceUrl}
                      children={
                        <FacebookIcon size={32} round={true}></FacebookIcon>
                      }
                    />
                    <button onClick={closeModal}>close</button>
                  </div>
                );
              })}
            </div>
          </Modal>
          <Typography gutterBottom variant="h5" component="h2"></Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <FavoriteBorderIcon />
        </Button>
        <button onClick={renderInfo}>View Recipe!</button>
      </CardActions>
    </Card>
  );
}
// <NavLink
// to={{
//   pathname: `/recipe/${id}`,
//   state: { recipe: id, modal: true }
// }}
// >
// View Recipe
// </NavLink>
// {recipe.instructions && (
//   <h1>Instructions: {<p>{recipe.instructions}</p>}</h1>
// )}
