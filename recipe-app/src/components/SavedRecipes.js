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

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);

  Modal.setAppElement("#root");

  console.log("recipes current state: ", recipes);
  useEffect(() => {
    axios.get("/api/saved").then(res => {
      console.log(res.data);
      setRecipes(prev => {
        return [...prev, ...res.data];
      });
    });
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  const renderInfo = e => {
    e.preventDefault();
    console.log("CLIIICKED");
  };

  const save = () => {
    console.log("ABLE TO SAVEEE!");
    //e.preventDefault();
    // console.log(recipes)
    // return axios
    // .post("/api/savedfavorite", {...recipe})
    // .then((res) => console.log(res));
  };

  console.log("recipes: ", recipes);

  const { loading, user } = useAuth0();
  
  if (loading || !user) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
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
              <Button onClick={save} size="small" color="primary">
                <FavoriteBorderIcon />
              </Button>
              <button onClick={renderInfo}>View Recipe!</button>
            </CardActions>
          </Card>
        );
      })}
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div>
          <p>hello</p>
        </div>
      </Modal>
    </div>
  );
}
