import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography, Container } from "@material-ui/core";
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
const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "6px 0",
    paddingBottom: "2px",
    "&.title": {
      color: "red"
    }
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url(img/landingpage.jpg)",
    height: "100vh",
    maxWidth: "100%"
  },
  rootGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  media: {
    height: 140
  },
  card: {
    padding: "8px",
    textAlign: "center"
  },
  title: {
    display: "flex",
    marginLeft: "40%"
  },
  actionbar: {
    display: "flex",
    flexDirection: "row-reverse",
    marginRight: "-17px",
    paddingTop: "0px"
  },
  actionbarcustom: {
    display: "flex",
    flexDirection: "row-reverse",
    marginRight: "0px",
    paddingTop: "0px"
  },
  recipetitle: {
    display: "flex",
    alignItems: "center"
  },
  viewbtn: {
    fontSize: "0.7rem",
    height: "30px",
    textTransform: "0",
    backgroundColor: "whitesmoke"
  }
});

export default function SavedRecipes({ image, title, id }) {
  const [recipes, setRecipes] = useState([]); // this is from saved recipe

  const classes = useStyles();

  const [currentId, setCurrentId] = useState(null);
  const [state, setState] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);
  const [isSpanish, setIsSpanish] = useState(false);

  const [customRecipes, setCustomRecipes] = useState([]); // this is from saved recipe
  const [customIsOpen, setCustomIsOpen] = useState(false);
  const [customState, setCustomState] = useState({});
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
    people: ""
  });

  //----------------------------------useEffects--------------------------------

  useEffect(() => {
    const userId = user.email;

    axios.get(`/api/saved/${userId}`).then(res => {
      console.log(res.data);
      setRecipes(prev => {
        return [...prev, ...res.data];
      });
    });
  }, []);

  useEffect(() => {
    const userId = user.email;
    axios.get(`/api/customrecipes/${userId}`).then(res => {
      // console.log(res.data);
      setCustomRecipes(prev => {
        return [...prev, ...res.data];
      });
    });
  }, []);

  Modal.setAppElement("#root");

  //-------------------------------Spoonacular Recipe Functions--------------------
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
        setState(response.data);
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

    Axios.delete(`http://localhost:5000/api/saved/${id}`, {}).then(res => {
      setRecipes(prev => {
        return prev.filter(item => item.id !== id);
      });
    });
    console.log("hello");
  };

  const { loading, user } = useAuth0();

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

    Axios.get(`http://localhost:5000/api/customrecipes/recipes/${id}`, { id })
      .then(response => {
        setCustomState(response.data);
        console.log("CUSTOM RESPONSE DATA: ", response.data);
      })
      .catch(error => {
        console.log("there is an error");
      });
  };

  function closeCustomModal() {
    setCustomIsOpen(false);
  }

  //-------------------------------Translate Hook------------------------------

  const translate = (e, name, description, ingredients, instruction) => {
    e.preventDefault();
    console.log("description = ", description);
    axios({
      method: "POST",
      url: `https://translation.googleapis.com/language/translate/v2?target=ja&key=${GOOGLE_API}&q=${name}, Description, Ingredients, Instructions`
    })
      .then(response => {
        console.log(
          "custom response.data=",
          response.data.data.translations[0]
        );

        const translatedText = response.data.data.translations[0].translatedText.split(
          ", "
        );

        // console.log("arr: ", translatedText);
        // console.log("arr index 0: ", translatedText[0]);
        setcustomSpanishState({
          name: translatedText[0],
          descriptionTitle: translatedText[1],
          ingredientsTitle: translatedText[2],
          instructionsTitle: translatedText[3]
        });
        setIsEnglish(false);
        setIsSpanish(true);
      })
      .then(() => {
        axios({
          method: "POST",
          url: `https://translation.googleapis.com/language/translate/v2?target=ja&key=${GOOGLE_API}&q=${description}`
        })
          .then(response => {
            const descriptionText =
              response.data.data.translations[0].translatedText;
            setcustomSpanishState(prev => ({
              ...prev,
              description: descriptionText
            }));
          })
          .then(() => {
            axios({
              method: "POST",
              url: `https://translation.googleapis.com/language/translate/v2?target=ja&key=${GOOGLE_API}&q=${ingredients}`
            })
              .then(response => {
                const ingredientsText =
                  response.data.data.translations[0].translatedText;

                setcustomSpanishState(prev => ({
                  ...prev,
                  ingredients: ingredientsText
                }));
              })
              .then(() => {
                axios({
                  method: "POST",
                  url: `https://translation.googleapis.com/language/translate/v2?target=ja&key=${GOOGLE_API}&q=${instruction}`
                }).then(response => {
                  const instructionsText =
                    response.data.data.translations[0].translatedText;
                  setcustomSpanishState(prev => ({
                    ...prev,
                    instructions: instructionsText
                  }));
                });
              });
          });
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
    e.preventDefault();
    axios({
      method: "POST",
      url: `https://translation.googleapis.com/language/translate/v2?target=ja&key=${GOOGLE_API}&q=${title}, Preparation Time, Serving, Source URL, Summary, Required Ingredients, Instructions, person, people`
    })
      .then(response => {
        const translatedSpoonacularText1 = response.data.data.translations[0].translatedText.split(
          ", "
        );

        const translatedSpoonacularText = translatedSpoonacularText1.map(
          (word, index) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
        );

        setcustomSpoonacularSpanishState({
          name: translatedSpoonacularText[0],
          preparationTime: translatedSpoonacularText[1],
          serving: translatedSpoonacularText[2],
          sourceURL: translatedSpoonacularText[3],
          summary: translatedSpoonacularText[4],
          requiredIngredientsTitle: translatedSpoonacularText[5],
          instructionsTitle: translatedSpoonacularText[6],
          person: translatedSpoonacularText[7],
          people: translatedSpoonacularText[8]
        });
        setIsEnglish(false);
        setIsSpanish(true);
      })
      .then(() => {
        axios({
          method: "POST",
          url: `https://translation.googleapis.com/language/translate/v2?target=ja&key=${GOOGLE_API}&q=${summary}`
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
              url: `https://translation.googleapis.com/language/translate/v2?target=ja&key=${GOOGLE_API}&q=${extendedIngredients}`
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
                  url: `https://translation.googleapis.com/language/translate/v2?target=ja&key=${GOOGLE_API}&q=${analyzedInstructions}`
                }).then(response => {
                  const translatedInstructionsText =
                    response.data.data.translations[0].translatedText;
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
    <Container className={classes.container}>
      <div>
        <Typography>
          <h1 className={classes.title}>Saved Recipes</h1>
        </Typography>

        <div className={classes.rootGrid}>
          <Grid container spacing={2} justify="center">
            {recipes.map((recipe, index) => {
              return (
                <Grid item>
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
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    ></Typography>
                    <div className={classes.recipetitle}> {recipe.title}</div>

                    <CardActions className={classes.actionbar}>
                      <Button
                        onClick={e => {
                          remove(e, recipe.id);
                        }}
                        size="small"
                        color="primary"
                      >
                        <DeleteTwoToneIcon />
                      </Button>

                      <Button
                        className={classes.viewbtn}
                        onClick={e => {
                          renderInfo(e, recipe.spoonacular_id);
                        }}
                        variant="contained"
                      >
                        View Recipe
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
          <div>
            {isEnglish && (
              <div>
                <h3>{state.title}</h3>
                <img src={state.image}></img>
                <div dangerouslySetInnerHTML={{ __html: state.summary }} />
                <p>{state.id}</p>
                <h2> Preparation time:</h2>
                <div>{<h3>{state.readyInMinutes} minutes</h3>} </div>
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
                      <div key={index}>{<h3>☞ {ingredient.original}</h3>}</div>
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
                  Japanese
                </button>
                <button onClick={closeModal}>close</button>
              </div>
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
                <div>{<h3>{state.readyInMinutes} minutes</h3>} </div>
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
                <h2>{customSpoonacularSpanishState.instructionsTitle}</h2>
                {customSpoonacularSpanishState.instructions
                  ? customSpoonacularSpanishState.instructions
                  : null}
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
        </Modal>
        <div className={classes.rootGrid}>
          <Grid container spacing={2} direction="row" justify="center">
            {customRecipes.map((recipe, index) => {
              return (
                <Grid item>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardContent>
                        <CardMedia
                          key={index}
                          component="img"
                          className={`${classes.media} ${classes.card}`}
                          image={recipe.image}
                          title={recipe.name}
                        />
                      </CardContent>
                    </CardActionArea>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    ></Typography>
                    {recipe.name}
                    <CardActions className={classes.actionbarcustom}>
                      <Button
                        className={classes.viewbtn}
                        onClick={e => {
                          renderCustomInfo(e, recipe.id);
                        }}
                        variant="contained"
                      >
                        View Recipe
                      </Button>

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
                </Grid>
              );
            })}
          </Grid>
        </div>
        <Modal isOpen={customIsOpen} onRequestClose={closeCustomModal}>
          <div>
            {isEnglish && (
              <div>
                <h1>{customState.name}</h1>
                <img src={customState.image}></img>
                <h2>Description</h2>
                {customState.description}
                <h2>Ingredients</h2>
                {customState.ingredients}

                <h2>Instructions</h2>
                {customState.instruction}
                <button
                  onClick={e => {
                    console.log("consol ", customState.ingredients);
                    translate(
                      e,
                      customState.name,
                      customState.description,
                      customState.ingredients,
                      customState.instruction
                    );
                  }}
                >
                  Japanese
                </button>
                <FacebookShareButton
                  url={"www.yahoo.com"}
                  children={
                    <FacebookIcon size={32} round={true}></FacebookIcon>
                  }
                />
                <button onClick={closeCustomModal}>close</button>
              </div>
            )}
            {isSpanish && (
              <div>
                <h3>{customSpanishState.name} </h3>
                <img src={customState.image}></img>
                <h3>{customSpanishState.descriptionTitle} </h3>
                <p>{customSpanishState.description} </p>
                <h3>{customSpanishState.ingredientsTitle} </h3>
                <p>{customSpanishState.ingredients} </p>

                {customSpanishState.instructions !== null ? (
                  <h3>{customSpanishState.instructionsTitle} </h3>
                ) : (
                  ""
                )}

                <p>{customSpanishState.instructions} </p>
                <button onClick={backToEnglish}>English</button>
                <FacebookShareButton
                  url={"www.yahoo.com"}
                  children={
                    <FacebookIcon size={32} round={true}></FacebookIcon>
                  }
                />
                <button onClick={closeCustomModal}>close</button>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </Container>
  );
}
