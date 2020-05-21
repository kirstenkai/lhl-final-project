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
    height: 200
  },
  modalTop: {
    display: "flex",
    justifyContent: "space-between"
  },
  color: {
    color: "red"
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

          <Typography gutterBottom variant="h5" component="h2"></Typography>
          {(title = title)}
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
        <Button className={classes.viewbtn} onClick={showRecipeInformation}>
          View Recipe
        </Button>
      </CardActions>
    </Card>
  );
}

// import React, { useState, useRef } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import CloseIcon from "@material-ui/icons/Close";
// import IconButton from "@material-ui/core/IconButton";
// import Container from "@material-ui/core/Container";
// // import Modal from "./Modal";
// import TransitionsModal from "./TransitionsModal";
// import { FacebookIcon } from "react-share";
// import ModalContent from "./ModalContent";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import Axios from "axios";
// // import { FacebookShareButton } from "react-share";
// // import { FacebookIcon } from "react-share";
// import axios from "axios";

// import { useAuth0 } from "../react-auth0-spa";

// // import Modal from "react-modal";

// require("dotenv").config();
// const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;
// const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345
//   },
//   media: {
//     height: 200
//   },
//   modalTop: {
//     display: "flex",
//     justifyContent: "space-between"
//   },
//   viewbtn: {
//     fontSize: "0.7rem",
//     height: "30px",
//     textTransform: "0",
//     backgroundColor: "whitesmoke"
//   }
//   // modal: {
//   //   maxWidth: "100%"
//   // }
// });

// export default function RecipeCard({ image, title, id }) {
//   const classes = useStyles();
//   const [state, setState] = useState({});
//   const [isOpen, setIsOpen] = useState(false);

//   const [isEnglish, setIsEnglish] = useState(true);
//   const [isSpanish, setIsSpanish] = useState(false);
//   const [customSpanishState, setcustomSpanishState] = useState({
//     name: "",
//     descriptionTitle: "",
//     description: "",
//     ingredientsTitle: "",
//     ingredients: "",
//     instructionsTitle: "",
//     instructions: ""
//   });
//   const [
//     customSpoonacularSpanishState,
//     setcustomSpoonacularSpanishState
//   ] = useState({
//     title: "",
//     preparationTime: "",
//     serving: "",
//     sourceURL: "",
//     name: "",
//     summary: "",
//     requiredIngredientsTitle: "",
//     ingredients: "",
//     instructionsTitle: "",
//     instructions: "",
//     person: "",
//     people: "",
//     minute: ""
//   });

//   // Modal.setAppElement("#root");

//   const renderInfo = e => {
//     e.preventDefault();
//     // setIsOpen(true);
//     Axios({
//       method: "GET",
//       url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
//       headers: {
//         "content-type": "application/octet-stream",
//         "x-rapidapi-host":
//           "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//         "x-rapidapi-key": `${SPOONACULAR_API}`,
//         useQueryString: true
//       }
//     })
//       .then(response => {
//         setState(response.data);
//         console.log("AXIOS RESPONSE STATE", response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   function closeModal() {
//     setIsOpen(false);
//   }
//   const { user } = useAuth0();
//   const save = e => {
//     e.preventDefault();
//     alert("saved!");

//     const user_id = user.email;

//     Axios.post("http://localhost:5000/api/saved", {
//       user_id,
//       id,
//       title,
//       image
//     })
//       .then(res => {
//         console.log(res);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   const translateSpoonacular = (
//     e,
//     title,
//     summary,
//     extendedIngredients,
//     analyzedInstructions
//   ) => {
//     console.log("has been clicked");
//     axios({
//       method: "POST",
//       url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=Preparation Time, Serving, Source URL, Summary, Required Ingredients, Instructions, person, persons, minute`
//     })
//       .then(response => {
//         const translatedSpoonacularText1 = response.data.data.translations[0].translatedText.split(
//           ", "
//         );
//         console.log("TRANSLATED", translatedSpoonacularText1);
//         const translatedSpoonacularText = translatedSpoonacularText1.map(
//           (word, index) => {
//             return word.charAt(0).toUpperCase() + word.slice(1);
//           }
//         );

//         console.log(translatedSpoonacularText);
//         console.log(translatedSpoonacularText[2]);

//         setcustomSpoonacularSpanishState({
//           preparationTime: translatedSpoonacularText[0],
//           serving: translatedSpoonacularText[1],
//           sourceURL: translatedSpoonacularText[2],
//           summary: translatedSpoonacularText[3],
//           requiredIngredientsTitle: translatedSpoonacularText[4],
//           instructionsTitle: translatedSpoonacularText[5],
//           person: translatedSpoonacularText[6],
//           people: translatedSpoonacularText[7],
//           minute: translatedSpoonacularText[8]
//         });
//         setIsEnglish(false);
//         setIsSpanish(true);
//       })
//       .then(() => {
//         axios({
//           method: "POST",
//           url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=${title}`
//         }).then(response => {
//           const translatedName =
//             response.data.data.translations[0].translatedText;
//           setcustomSpoonacularSpanishState(prev => ({
//             ...prev,
//             title: translatedName
//           }));
//         });
//       })

//       .then(() => {
//         axios({
//           method: "POST",
//           url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=${summary}`
//         })
//           .then(response => {
//             const translatedSummaryText =
//               response.data.data.translations[0].translatedText;
//             setcustomSpoonacularSpanishState(prev => ({
//               ...prev,
//               summary: translatedSummaryText
//             }));
//           })
//           .then(() => {
//             axios({
//               method: "POST",
//               url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=${extendedIngredients}`
//             })
//               .then(response => {
//                 const translatedIngredientsText =
//                   response.data.data.translations[0].translatedText;
//                 console.log("LOS INGREDIENTES: ", translatedIngredientsText);
//                 setcustomSpoonacularSpanishState(prev => ({
//                   ...prev,
//                   ingredients: translatedIngredientsText
//                 }));
//               })
//               .then(() => {
//                 axios({
//                   method: "POST",
//                   url: `https://translation.googleapis.com/language/translate/v2?target=fi&key=${GOOGLE_API}&q=${analyzedInstructions}`
//                 }).then(response => {
//                   const translatedInstructionsText =
//                     response.data.data.translations[0].translatedText;
//                   console.log("Instructions??", translatedInstructionsText);
//                   setcustomSpoonacularSpanishState(prev => ({
//                     ...prev,
//                     instructions: translatedInstructionsText
//                   }));
//                 });
//               });
//           });
//       });
//   };

//   const backToEnglish = e => {
//     e.preventDefault();
//     setIsSpanish(false);
//     setIsEnglish(true);
//   };

//   return (
//     <Card className={classes.root}>
//       <CardActionArea>
//         <CardContent>
//           <CardMedia
//             className={classes.media}
//             component="img"
//             image={image}
//             title={title}
//             id={id}
//           />
//           <TransitionsModal
//             searchIngredients={renderInfo}
//             title={title}
//             image={image}
//           >
//             {isEnglish && (
//               <ModalContent
//                 description={state.summary}
//                 ingredients={
//                   state.extendedIngredients &&
//                   state.extendedIngredients.map((ingredient, index) => {
//                     return (
//                       <div key={index}>{<h3>☞ {ingredient.original}</h3>}</div>
//                     );
//                   })
//                 }
//                 instructionsTitle={
//                   state.analyzedInstructions &&
//                   state.analyzedInstructions.length ? (
//                     <h2>Instructions</h2>
//                   ) : null
//                 }
//                 instructions={
//                   state.analyzedInstructions &&
//                   state.analyzedInstructions.map((instruction, index) => {
//                     return instruction.steps.map((key2, index) => {
//                       return (
//                         <div key={index}>
//                           <ol>
//                             {" "}
//                             {index + 1}. {key2.step}
//                           </ol>
//                         </div>
//                       );
//                     });
//                   })
//                 }
//                 translateSpoonacular={e =>
//                   translateSpoonacular(
//                     e,
//                     state.title,
//                     state.summary,
//                     state.extendedIngredients.map(key => key.original),
//                     state.analyzedInstructions.length
//                       ? state.analyzedInstructions[0].steps.map(key => key.step)
//                       : null
//                   )
//                 }
//                 sourceUrl={state.sourceUrl}
//                 children={<FacebookIcon size={32} round={true}></FacebookIcon>}
//               ></ModalContent>
//             )}

//             {isSpanish && (
//               <ModalContent
//                 title={customSpoonacularSpanishState.title}
//                 image={image}
//                 description={customSpoonacularSpanishState.summary}
//                 ingredients={
//                   customSpoonacularSpanishState.ingredients
//                     ? customSpoonacularSpanishState.ingredients
//                     : null
//                 }
//                 instructionsTitle={
//                   customSpoonacularSpanishState.requiredIngredientsTitle
//                 }
//                 instructions={customSpoonacularSpanishState.instructions}
//                 sourceUrl={state.sourceUrl}
//                 children={<FacebookIcon size={32} round={true}></FacebookIcon>}
//               >
//                 <button onClick={backToEnglish}>English</button>
//               </ModalContent>
//             )}
//           </TransitionsModal>

//           <Typography gutterBottom variant="h5" component="h2"></Typography>
//           {(title = title)}
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button onClick={save} size="small" color="primary">
//           <FavoriteBorderIcon />
//         </Button>

//         <Button className={classes.viewbtn} onClick={renderInfo}>
//           View Recipe
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }
