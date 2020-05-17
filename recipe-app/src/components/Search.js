import React, { useState, Fragment } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";

import { useAuth0 } from "../react-auth0-spa";

// NEW - IMPLEMENT SEARCH BAR
import { makeStyles, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Grid, Container } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
//import UploadButton from "./UploadButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    justify: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

require("dotenv").config();
const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;

export default function Search({ renderInfo }) {
  const [recipes, setRecipes] = useState([]);
  const [file, setFile] = useState();
  const [imageURL, setimageURL] = useState();
  // console.log(recipes[0])
  const getRecipe = (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    setRecipes([]);

    axios({
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": `${SPOONACULAR_API}`,
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
        ingredients: `${recipeName}`,
        // ingredients: "apples,flour,sugar"
      },
    })
      .then((response) => {
        //1. look at the response, and push the results into an object
        //2. in the Component, render the parts you want from that object and
        //   put in in the list of the pictures
        // 3. in this case, we only want the ID of the recipe, and find (via click of pic
        //    item?)
        //4. make another axios request to get the full detail and instructions of the
        //   full deets of the recipe itself to render on the component / modal
        // console.log(response.data[0]);

        setRecipes((prev) => {
          return [...prev, response.data];
        });
        //console.log(recipes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const nestedRecipes = recipes.flat();
  const classes = useStyles();

  const { loading, user } = useAuth0();

  const translateCard = (e) => {
    e.preventDefault();
    console.log("hey");
  };

  // Show the loading state if the page is loading or if there is no user currently authenticated
  if (loading || !user) {
    return <div>Loading...</div>;
  }
  // const imageURL =
  //   "https://www.highriveronline.com/images/stories/news_photos_2018/ag/general/milk_june_1.JPG";
  function uploadPicture(e) {
    e.preventDefault();
  }

  // const imagefunc = (e) => {
  //   e.preventDefault();

  //   console.log("test image func");
  // };

  const onChangeHandler = (e) => {
    setFile(e.target.files);
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", file[0]);
    data.append("upload_preset", "djf7hmxw");
    data.append("api_key", "543525514594876");
    data.append("timestamp", Date.now / 1000);

    return axios
      .post("https://api.cloudinary.com/v1_1/dva8dqtxn/image/upload", data, {
        headers: { "X-Requested-With": "XMLHttpRequest" }, // receive two    parameter endpoint url ,form data
      })
      .then((res) => {
        return res.data.secure_url;
      })
      .then((res) => {
        return axios
          .post("http://localhost:5000/api/imagerecognition", {
            imageURL: res,
          })
          .then((res) => {
            console.log("===>" + res.data.output);
          });
          
      });
  };

  return (
    <Container maxWidth="lg">
      <input type="file" name="file" onChange={onChangeHandler} />
      <button type="button" onClick={onClickHandler}>
        Upload
      </button>

      <a href="#" onClick={uploadPicture}>
        Click me
      </a>

      {/* <UploadButton onClick={imagefunc} /> */}

      <Typography>
        <h1>Search</h1>
        <button
          onClick={(e) => {
            console.log("neested", nestedRecipes[0]);
          }}
        >
          Spanish
        </button>
      </Typography>
      <form onSubmit={getRecipe}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid xs={8}>
            <TextField
              name="recipeName"
              id="standard-full-width"
              label="Search ingredients"
              style={{ margin: 8 }}
              placeholder="chicken, carrots, bananas"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Grid container spacing={2}>
            {nestedRecipes.map((recipe, index) => {
              //console.log("recipe name: ", recipe.title);
              return (
                <Grid item xs={12} sm={6} md={4}>
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
            })}
          </Grid>
        </div>
      </form>
    </Container>
  );
}
