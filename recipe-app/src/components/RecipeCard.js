import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TransitionsModal from "./TransitionsModal";
import { FacebookIcon } from "react-share";
import ModalContent from "./ModalContent";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Axios from "axios";
import axios from "axios";

import { useAuth0 } from "../react-auth0-spa";

require("dotenv").config();

const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;
const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 230,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  modalTop: {
    display: "flex",
    justifyContent: "space-between"
  },
  color: {
    color: "red"
  },
  header: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    paddingTop: "16px"
  },
  viewbtn: {
    fontSize: "0.7rem",
    height: "30px",
    textTransform: "0",
    backgroundColor: "whitesmoke"
  }
});

const defaultCardInfo = {
  title: "",
  sourceURL: "",
  name: "",
  summaryTitle: "",
  summary: "",
  requiredIngredientsTitle: "",
  ingredients: [],
  instructionsTitle: "",
  instructions: []
};

const defaultLanguage = "en";

const generateSpoonacularParams = id => ({
  method: "GET",
  url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": `${SPOONACULAR_API}`,
    useQueryString: true
  }
});

const onError = err => console.warn(err);

export default function RecipeCard({ image, title, id }) {
  const { user } = useAuth0();
  const classes = useStyles();
  const [recipeCardInfo, setRecipeCardInfo] = useState(defaultCardInfo);
  const [color, setColor] = useState();

  const getRecipe = () => {
    Axios(generateSpoonacularParams(id))
      .then(response => {
        const { data } = response;
        console.log(data.extendedIngredients);
        let instructions = [];
        if (data.analyzedInstructions && data.analyzedInstructions.length > 0) {
          instructions = data.analyzedInstructions[0].steps.map(
            each => each.step
          );
        }
        setRecipeCardInfo(prev => {
          return {
            ...prev,
            ingredients: data.extendedIngredients.map(i => i.original),
            summary: data.summary,
            name: data.title
          };
        });
      })
      .catch(onError);
  };

  const showRecipeInformation = e => {
    getRecipe();
  };

  const user_id = user.email;
  const saveRecipeOnClick = e => {
    Axios.post("http://localhost:5000/api/saved", {
      user_id,
      id,
      title,
      image
    })
      .then(res => {
        setColor(classes.color);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const translate = () => {
    const fields = [
      "Summary, Required Ingredients, Instructions",
      recipeCardInfo.name,
      recipeCardInfo.summary.slice(0, 293),
      recipeCardInfo.ingredients.join(" === ")
    ].join("---");
    axios({
      method: "POST",
      url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=${fields}`
    }).then(response => {
      const text = response.data.data.translations[0].translatedText;

      const fieldsArray = text.split("---").map(each => {
        const processed = each.trim();
        return processed.charAt(0).toUpperCase() + processed.slice(1);
      });

      const [headers, title, summary, rawIngredients] = fieldsArray;

      const [
        summaryTitle,
        requiredIngredientsTitle,
        instructionsTitle
      ] = headers.split(",").map(word => {
        const h = word.charAt(0).toUpperCase() + word.slice(1);
        return h.trim();
      });

      debugger;

      setRecipeCardInfo(prev => ({
        ...prev,
        summaryTitle,
        requiredIngredientsTitle,
        instructionsTitle,
        title,
        summary,
        ingredients: rawIngredients ? rawIngredients.split(" === ") : []
      }));
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <CardMedia
            className={classes.media}
            component="img"
            image={image}
            title={title}
            id={id}
          />

          <Typography
            className={classes.header}
            gutterBottom
            variant="h6"
            component="p"
            fontSize="14px"
          >
            {(title = title)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={saveRecipeOnClick}
          size="small"
          color="prime"
          className={color}
        >
          <FavoriteBorderIcon />
        </Button>
        <TransitionsModal
          searchIngredients={showRecipeInformation}
          title={title}
          image={image}
          description={recipeCardInfo.summary}
          ingredients={recipeCardInfo.ingredients.map((ingredient, index) => (
            <div key={index}>{<h3>☞ {ingredient}</h3>}</div>
          ))}
          instructionsTitle={
            recipeCardInfo.instructions &&
            recipeCardInfo.instructions.length ? (
              <h2>Instructions</h2>
            ) : null
          }
          instructions={recipeCardInfo.instructions.map(
            (instruction, index) => {
              return (
                <div key={index}>
                  <ol>
                    {" "}
                    {index + 1}. {instruction}
                  </ol>
                </div>
              );
            }
          )}
          translateSpoonacular={translate}
          resetToEnglish={showRecipeInformation}
          sourceUrl={recipeCardInfo.sourceUrl}
          children={<FacebookIcon size={32} round={true}></FacebookIcon>}
        ></TransitionsModal>
      </CardActions>
    </Card>
  );
}
