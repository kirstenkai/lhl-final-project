import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
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
import axios from "axios";
import RecipeCard from "./RecipeCard";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

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

export default function SavedRecipes({ image, title, id }) {
  const [recipes, setRecipes] = useState([]); // this is from saved recipe

  const classes = useStyles();

  const [currentId, setCurrentId] = useState(null);
  const [state, setState] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [customRecipes, setCustomRecipes] = useState([]); // this is from saved recipe
  const [customIsOpen, setCustomIsOpen] = useState(false);
  const [customState, setCustomState] = useState([]);

  
  

  const { loading, user } = useAuth0();
  //console.log(user.sub)
  useEffect(() => {
    const userId = user.email;

    axios.get(`/api/saved/${userId}`)
    .then(res => {
      // console.log(res.data);
      setRecipes(prev => {
        return [...prev, ...res.data];
      });
    });
  }, []);

  useEffect(() => {
     const userId = user.email;
    axios.get(`/api/customrecipes/${userId}`)
    .then((res) => {
      // console.log(res.data);
      setCustomRecipes((prev) => {
        return [...prev, ...res.data];
      });
    });
  }, []);

  Modal.setAppElement("#root");

  const renderInfo = (e, id) => {
    e.preventDefault();
    setIsOpen(true);
    setCurrentId(id);
    console.log("id=", id);
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

  const remove = (e, id) => {
    e.preventDefault();

    Axios.delete(`http://localhost:5000/api/saved/${id}`, {})
    .then(res => {
      setRecipes(prev => {
        return prev.filter(item => item.id !== id);
      });
    });
    console.log("hello");
  };

  

  if (loading || !user) {
    return <div>Loading...</div>;
  }
  //------------------------------Custom Recipe Functions------------------

  const removeCustomRecipe = (e, id) => {
    e.preventDefault();
    console.log("removed!");
    Axios.delete(`http://localhost:5000/api/customrecipes/${id}`, {}).then(
      res => {
        setCustomRecipes(prev => {
          return prev.filter(item => item.id !== id);
        });
      }
    );
  };

  const renderCustomInfo = (e, id) => {
    e.preventDefault();
    setCustomIsOpen(true);

    Axios.get(`http://localhost:5000/api/customrecipes/${id}`, { id })
      .then(response => {
        setCustomState(prev => {
          return [...prev, response];
        });
      })
      .catch(error => {
        console.log("there is an error");
      });
  };

  function closeCustomModal() {
    setCustomIsOpen(false);
  }

  return (
    <div>
      {customRecipes.map((recipe, index) => {
        return (
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <CardMedia
                  key={index}
                  component="img"
                  className={classes.media}
                  image={recipe.image}
                  title={recipe.name}
                />
              </CardContent>
            </CardActionArea>
            <Typography gutterBottom variant="h5" component="h2"></Typography>
            {recipe.name}
            <CardActions>
              <button
                onClick={e => {
                  renderCustomInfo(e, recipe.id);
                }}
              >
                View Recipe!
              </button>
              <Button
                onClick={e => {
                  removeCustomRecipe(e, recipe.id);
                }}
                size="small"
                color="primary"
              >
                <DeleteTwoToneIcon />
              </Button>
            </CardActions>
          </Card>
        );
      })}
      <Modal isOpen={customIsOpen} onRequestClose={closeCustomModal}>
        <div>
          {customState.map((recipe, index) => {
            console.log("recipe data", recipe);
          })}

          <FacebookShareButton
            url={"www.yahoo.com"}
            children={<FacebookIcon size={32} round={true}></FacebookIcon>}
          />
          <button onClick={closeModal}>close</button>
        </div>
      </Modal>

      {recipes.map((recipe, index) => {
        return (
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <CardMedia
                  key={index}
                  component="img"
                  className={classes.media}
                  image={recipe.image}
                  title={recipe.title}
                />
              </CardContent>
            </CardActionArea>
            <Typography gutterBottom variant="h5" component="h2"></Typography>
            {recipe.title}
            <CardActions>
              <button
                onClick={e => {
                  renderInfo(e, recipe.spoonacular_id);
                }}
              >
                View Recipe!
              </button>
              <Button
                onClick={e => {
                  remove(e, recipe.id);
                }}
                size="small"
                color="primary"
              >
                <DeleteTwoToneIcon />
              </Button>
            </CardActions>
          </Card>
        );
      })}
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div>
          {state.map((recipes, index) => {
            console.log("recipes =", recipes);
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
                  <a href={recipe.sourceUrl}> {<p>{recipe.sourceUrl}</p>}</a>
                </span>
                <h2>Required Ingredients</h2>
                {recipe.extendedIngredients &&
                  recipe.extendedIngredients.map((ingredient, index) => {
                    return (
                      <div key={index}>{<h3>☞ {ingredient.original}</h3>}</div>
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
    </div>
  );
}
