import React, { useState, useRef } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";

import { useAuth0 } from "../react-auth0-spa";

// NEW - IMPLEMENT SEARCH BAR
import { makeStyles, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Grid, Container, InputAdornment, Divider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "63px",
    width: "100%",
    fontSize: "large",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url(img/landingpage.jpg)",
    height: "100vh",
    maxWidth: "100%",
  },
  search: {
    width: "60%",
    display: "flex",
    marginLeft: "40%",
  },
  upload: {
    display: "flex",
    justifyContent: "flex-end",
  },
  input: {
    display: "none",
  },
  camera: {
    height: "55px",
    width: "55px",
    marginTop: "-20px",
  },
  searchbutton: {
    marginLeft: "60%",
    marginTop: "55px",
  },
  margin: {
    margin: theme.spacing(1),
  },
  searchicon: {
    marginLeft: "12px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  field: {
    width: "500px",
    marginBottom: "45px",
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }
}));

require("dotenv").config();
const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;

export default function Search({ renderInfo }) {
  const [recipes, setRecipes] = useState([]);
  const [file, setFile] = useState();
  const [imageURL, setimageURL] = useState();
  const { loading, user } = useAuth0();
  const [input, setInput] = useState();
  const [searched, setSearched] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const fileInput = useRef(null);

  const getRecipe = () => {
    setSearched(false);
    const recipeName = input;
    console.log("heloo clicked");
    setRecipes([]);
    axios({
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      headers: {
        "content-type": "application/octet-stream",
        "Access-Control-Allow-Origin": "*",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": `${SPOONACULAR_API}`
      },
      params: {
        number: "20",
        ranking: "1",
        ignorePantry: "false",

        //1. when clicked on search, setIngredients the array of values listed
        //2. make a function that grabs the ingredients saved in Ingredients state, map
        //  through and with %2C in between each ingredient and save it into a Variable,
        ///  a non-array version = Array.toString()
        //3. below input the value within that variable

        //string escaping- regex
        ingredients: `${recipeName}`
        // ingredients: "apples,flour,sugar"
      }
    })
      .then(response => {
        //1. look at the response, and push the results into an object
        //2. in the Component, render the parts you want from that object and
        //   put in in the list of the pictures
        // 3. in this case, we only want the ID of the recipe, and find (via click of pic
        //    item?)
        //4. make another axios request to get the full detail and instructions of the
        //   full deets of the recipe itself to render on the component / modal
        // console.log(response.data[0]);

        setRecipes(prev => {
          return [...prev, response.data];
        });
        setSearched(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const nestedRecipes = recipes.flat();
  const classes = useStyles();

  // Show the loading state if the page is loading or if there is no user currently authenticated
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const onChangeHandler = e => {
    setFile(e.target.files);
    setUploadedFileName(e.target.files[0].name);
  };

  const photoButtonClicked = () => {
    fileInput.current.click();
  };

  const processUploadedImage = () => {
    const data = new FormData();

    setTimeout(() => {
      setUploadedFileName("");
    }, 1500);

    data.append("file", file[0]);
    data.append("upload_preset", "djf7hmxw");
    data.append("api_key", process.env.API_KEY);
    data.append("timestamp", Date.now / 1000);

    return axios
      .post("https://api.cloudinary.com/v1_1/dva8dqtxn/image/upload", data, {
        headers: { "X-Requested-With": "XMLHttpRequest" } // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        return res.data.secure_url;
      })
      .then(res => {
        return axios
          .post("http://localhost:5000/api/imagerecognition", {
            imageURL: res
          })
          .then(res => {
            setInput(prev =>
              prev ? (prev += `, ${res.data.output}`) : res.data.output
            );
          });
      });
  };

  return (
    <Container className={classes.container}>
      <Grid
        container
        className={classes.searchbutton}
        spacing={1}
        alignItems="flex-end"
      >
        <Grid item></Grid>
        <Grid>
          <TextField
            className={classes.field}
            name="recipeName"
            InputLabelProps={{ shrink: true }}
            id="outlined-search"
            label="Search ingredients"
            type="search"
            variant="outlined"
            onChange={e => setInput(e.target.value)}
            value={input}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <Divider orientation="vertical" flexItem />
                  <SearchIcon
                    className={classes.searchicon}
                    onClick={getRecipe}
                  />
                </InputAdornment>
              )
            }}
          ></TextField>
          <div className={classes.upload}>
            <input
              type="file"
              style={{ display: "none" }}
              name="file"
              ref={fileInput}
              onChange={onChangeHandler}
            />
            <label htmlFor="file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={photoButtonClicked}
              >
                <PhotoCamera className={classes.camera} />
              </IconButton>
              <div> {uploadedFileName}</div>
            </label>
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                type="button"
                onClick={processUploadedImage}
              >
                Add to Search Bar
              </Button>
            </label>
          </div>
        </Grid>
      </Grid>
      <div className={classes.root}>
        <Grid container spacing={2} justify="center">
          {!nestedRecipes[0] && searched ? (
            <h1>Sorry, no recipes found</h1>
          ) : (
            nestedRecipes.map((recipe, index) => {
              //console.log("recipe name: ", recipe.title);
              return (
                <Grid item>
                  <div key={index}>
                    <RecipeCard
                      title={recipe.title}
                      image={recipe.image}
                      id={recipe.id}
                      className={classes.card}
                    />
                  </div>
                </Grid>
              );
            })
          )}
        </Grid>
      </div>
      {/* </form> */}
    </Container>
  );
}