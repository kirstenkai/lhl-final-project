import React, { useState, useRef } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { useAuth0 } from "../react-auth0-spa";
import { makeStyles, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Grid, InputAdornment, Divider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
require("dotenv").config();

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
    width: "100%",
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
  margin: {
    margin: theme.spacing(0, 3),
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
    marginTop: "50px",
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  headerLinks: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    "& button": {
      color: "#1C1C1C",
      textDecoration: "none",
      fontWeight: "900",
    },
    width: "50%",
  },
  headerDecoration: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#CDE1CC",
    width: "100%",
    height: "200px",
  },
}));

const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;
export default function Search({ renderInfo }) {
  const [recipes, setRecipes] = useState([]);
  const [file, setFile] = useState();
  const { loading, user } = useAuth0();
  const [input, setInput] = useState();
  const [searched, setSearched] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const fileInput = useRef(null);

  const getRecipe = () => {
    setSearched(false);
    setRecipes([]);
    const recipeName = input;
    axios({
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      headers: {
        "content-type": "application/octet-stream",
        "Access-Control-Allow-Origin": "*",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": `${SPOONACULAR_API}`,
      },
      params: {
        number: "20",
        ranking: "1",
        ignorePantry: "false",
        ingredients: `${recipeName}`,
      },
    })
      .then((response) => {
        setRecipes((prev) => {
          return [...prev, response.data];
        });
        setSearched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const nestedRecipes = recipes.flat();
  const classes = useStyles();
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const onChangeHandler = (e) => {
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
    }, 1000);

    data.append("file", file[0]);
    data.append("upload_preset", "djf7hmxw");
    data.append("api_key", process.env.API_KEY);
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
            setInput((prev) =>
              prev ? (prev += `, ${res.data.output}`) : res.data.output
            );
          });
      });
  };
  return (
    <div className={classes.container}>
      <Grid container alignItems="flex-end" justify="center">
        <Grid item></Grid>
        <Grid>
          <TextField
            className={classes.field}
            name="recipeName"
            InputLabelProps={{ shrink: true }}
            id="outlined-search"
            placeholder="Find recipes by ingredients"
            type="search"
            variant="outlined"
            onChange={(e) => setInput(e.target.value)}
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
              ),
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
        <Grid container spacing={3} justify="center" width="100%">
          {!nestedRecipes[0] && searched ? (
            <h1>Sorry, no recipes found</h1>
          ) : (
            nestedRecipes.map((recipe, index) => {
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
    </div>
  );
}
