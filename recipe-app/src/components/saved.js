import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const SPOONACULAR_API = process.env.REACT_APP_SPOONACULAR_API;
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

export default function RecipeCard({ image, title, id }) {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const [state, setState] = useState([]);
  const renderInfo = (e) => {
    e.preventDefault();
    setCurrentId(id);
  };

  useEffect(() => {
    Axios({
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${currentId}/information`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": `${SPOONACULAR_API}`,
        useQueryString: true,
      },
    })
      .then((response) => {
        setState((prev) => {
          return [...prev, response];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentId]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <button type="submit" onClick>
            <CardMedia
              component="img"
              className={classes.media}
              image={image}
              title="Contemplative Reptile"
            />
          </button>
          <button onClick={renderInfo}>View Recipe</button>
          <Typography gutterBottom variant="h5" component="h2">
            {(title = title)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          <FavoriteBorderIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
