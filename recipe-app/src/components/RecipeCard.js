import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
// import Modal from "./Modal";
import TransitionsModal from "./TransitionsModal";
import { FacebookIcon } from "react-share";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Axios from "axios";
// import { FacebookShareButton } from "react-share";
// import { FacebookIcon } from "react-share";
import axios from "axios";

import { useAuth0 } from "../react-auth0-spa";

// import Modal from "react-modal";

require("dotenv").config();
const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;
const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 200
  },
  modalTop: {
    display: "flex",
    justifyContent: "space-between"
  },
  viewbtn: {
    fontSize: "0.7rem",
    height: "30px",
    textTransform: "0",
    backgroundColor: "whitesmoke"
  }
  // modal: {
  //   maxWidth: "100%"
  // }
});

export default function RecipeCard({ image, title, id }) {
  const classes = useStyles();
  const [state, setState] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [isEnglish, setIsEnglish] = useState(true);
  const [isSpanish, setIsSpanish] = useState(false);
  const [customSpanishState, setcustomSpanishState] = useState({
    name: "",
    descriptionTitle: "",
    description: "",
    ingredientsTitle: "",
    ingredients: "",
    instructionsTitle: "",
    instructions: ""
  });
  const [
    customSpoonacularSpanishState,
    setcustomSpoonacularSpanishState
  ] = useState({
    title: "",
    preparationTime: "",
    serving: "",
    sourceURL: "",
    name: "",
    summary: "",
    requiredIngredientsTitle: "",
    ingredients: "",
    instructionsTitle: "",
    instructions: "",
    person: "",
    people: "",
    minute: ""
  });

  // Modal.setAppElement("#root");

  const renderInfo = e => {
    e.preventDefault();
    // setIsOpen(true);
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
        setState(response.data);
        console.log("AXIOS RESPONSE STATE", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  function closeModal() {
    setIsOpen(false);
  }
  const { user } = useAuth0();
  const save = e => {
    e.preventDefault();
    alert("saved!");

    const user_id = user.email;

    Axios.post("http://localhost:5000/api/saved", {
      user_id,
      id,
      title,
      image
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const translateSpoonacular = (
    e,
    title,
    summary,
    extendedIngredients,
    analyzedInstructions
  ) => {
    console.log("has been clicked");
    axios({
      method: "POST",
      url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=Preparation Time, Serving, Source URL, Summary, Required Ingredients, Instructions, person, persons, minute`
    })
      .then(response => {
        const translatedSpoonacularText1 = response.data.data.translations[0].translatedText.split(
          ", "
        );
        console.log("TRANSLATED", translatedSpoonacularText1);
        const translatedSpoonacularText = translatedSpoonacularText1.map(
          (word, index) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
        );

        console.log(translatedSpoonacularText);
        console.log(translatedSpoonacularText[2]);

        setcustomSpoonacularSpanishState({
          preparationTime: translatedSpoonacularText[0],
          serving: translatedSpoonacularText[1],
          sourceURL: translatedSpoonacularText[2],
          summary: translatedSpoonacularText[3],
          requiredIngredientsTitle: translatedSpoonacularText[4],
          instructionsTitle: translatedSpoonacularText[5],
          person: translatedSpoonacularText[6],
          people: translatedSpoonacularText[7],
          minute: translatedSpoonacularText[8]
        });
        setIsEnglish(false);
        setIsSpanish(true);
      })
      .then(() => {
        axios({
          method: "POST",
          url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=${title}`
        }).then(response => {
          const translatedName =
            response.data.data.translations[0].translatedText;
          setcustomSpoonacularSpanishState(prev => ({
            ...prev,
            title: translatedName
          }));
        });
      })

      .then(() => {
        axios({
          method: "POST",
          url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=${summary}`
        })
          .then(response => {
            const translatedSummaryText =
              response.data.data.translations[0].translatedText;
            setcustomSpoonacularSpanishState(prev => ({
              ...prev,
              summary: translatedSummaryText
            }));
          })
          .then(() => {
            axios({
              method: "POST",
              url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=${extendedIngredients}`
            })
              .then(response => {
                const translatedIngredientsText =
                  response.data.data.translations[0].translatedText;
                console.log("LOS INGREDIENTES: ", translatedIngredientsText);
                setcustomSpoonacularSpanishState(prev => ({
                  ...prev,
                  ingredients: translatedIngredientsText
                }));
              })
              .then(() => {
                axios({
                  method: "POST",
                  url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=${analyzedInstructions}`
                }).then(response => {
                  const translatedInstructionsText =
                    response.data.data.translations[0].translatedText;
                  console.log("Instructions??", translatedInstructionsText);
                  setcustomSpoonacularSpanishState(prev => ({
                    ...prev,
                    instructions: translatedInstructionsText
                  }));
                });
              });
          });
      });
  };

  const backToEnglish = e => {
    e.preventDefault();
    setIsSpanish(false);
    setIsEnglish(true);
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
          <TransitionsModal
            title={title}
            image={image}
            searchIngredients={renderInfo}
            description={state.summary}
            ingredients={
              state.extendedIngredients &&
              state.extendedIngredients.map((ingredient, index) => {
                return (
                  <div key={index}>{<h3>☞ {ingredient.original}</h3>}</div>
                );
              })
            }
            instructionsTitle={
              state.analyzedInstructions &&
              state.analyzedInstructions.length ? (
                <h2>Instructions</h2>
              ) : null
            }
            instructions={
              state.analyzedInstructions &&
              state.analyzedInstructions.map((instruction, index) => {
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
              })
            }
            onClick={() => translateSpoonacular(state.title, state.summary)}
            sourceUrl={state.sourceUrl}
            children={<FacebookIcon size={32} round={true}></FacebookIcon>}
          />

          {/* 
          
   
              {isEnglish && (
                <Container>
                  <div>
                    <h3>{state.title}</h3>
                    <IconButton aria-label="delete" onClick={closeModal}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <img src={state.image}></img>
                  <div dangerouslySetInnerHTML={{ __html: state.summary }} />
                  <p>{state.id}</p>
                  <h2> Preparation time:</h2>
 
                    {
                      <h3>
                        {state.readyInMinutes} {state.minute}
                      </h3>
                    }{" "}
                  </div>
                  <h2>Serving: </h2>

                  {state.servings === 1 ? (
                    <h3>{state.servings} person</h3>
                  ) : (
                    <h3> {state.servings} people</h3>
                  )}
                  <span>
                    <h2>Source URL:</h2>
                    <a href={state.sourceUrl}> {<p>{state.sourceUrl}</p>}</a>
                  </span>
                  <h2>Required Ingredients</h2>
                  {state.extendedIngredients &&
                    state.extendedIngredients.map((ingredient, index) => {
                      return (
                        <div key={index}>
                          {<h3>☞ {ingredient.original}</h3>}
                        </div>
                      );
                    })}
                  {state.analyzedInstructions &&
                  state.analyzedInstructions.length ? (
                    <h2>Instructions</h2>
                  ) : null}
                  {state.analyzedInstructions &&
                    state.analyzedInstructions.map((instruction, index) => {
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
                    url={state.sourceUrl}
                    children={
                      <FacebookIcon size={32} round={true}></FacebookIcon>
                    }
                  />
                  <button
                    onClick={e => {
                      translateSpoonacular(
                        e,
                        state.title,
                        state.summary,
                        state.extendedIngredients.map(key => key.original),
                        state.analyzedInstructions.length
                          ? state.analyzedInstructions[0].steps.map(
                              key => key.step
                            )
                          : null
                      );
                    }}
                  >
                    Finnish
                  </button>
                </Container>



                ///////////
              )}
              {isSpanish && (
                <div>
                  <h3>{customSpoonacularSpanishState.title}</h3>
                  <img src={state.image}></img>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: customSpoonacularSpanishState.summary
                    }}
                  />
                  <p>{state.id}</p>
                  <h2> {customSpoonacularSpanishState.preparationTime}</h2>
                  <div>{<h3>{state.readyInMinutes} min</h3>} </div>
                  <h2>{customSpoonacularSpanishState.serving} </h2>

                  {state.servings === 1 ? (
                    <h3>
                      {state.servings} {customSpoonacularSpanishState.person}
                    </h3>
                  ) : (
                    <h3>
                      {" "}
                      {state.servings} {customSpoonacularSpanishState.people}
                    </h3>
                  )}
                  <span>
                    <h2>{customSpoonacularSpanishState.sourceUrl}</h2>
                    <a href={state.sourceUrl}> {<p>{state.sourceUrl}</p>}</a>
                  </span>
                  <h2>
                    {customSpoonacularSpanishState.requiredIngredientsTitle}
                  </h2>
                  {customSpoonacularSpanishState.ingredients
                    ? customSpoonacularSpanishState.ingredients
                    : null}

                  {customSpoonacularSpanishState.instructions !== "tyhjä" ? (
                    <div>
                      <h3>
                        {" "}
                        {customSpoonacularSpanishState.instructionsTitle}
                      </h3>
                      {customSpoonacularSpanishState.instructions}
                    </div>
                  ) : (
                    ""
                  )}

                  <button onClick={backToEnglish}>English</button>
                  <FacebookShareButton
                    url={state.sourceUrl}
                    children={
                      <FacebookIcon size={32} round={true}></FacebookIcon>
                    }
                  />
                  <button onClick={closeModal}>close</button>
                </div>
              )}
            </div>
          </Modal> */}

          <Typography gutterBottom variant="h5" component="h2"></Typography>
          {(title = title)}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={save} size="small" color="primary">
          <FavoriteBorderIcon />
        </Button>

        <Button className={classes.viewbtn} onClick={renderInfo}>
          View Recipe
        </Button>
      </CardActions>
    </Card>
  );
}
