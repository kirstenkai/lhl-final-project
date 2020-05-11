import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function RecipeCard({ image, title, renderInfo }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <CardMedia
            component="img"
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
          />

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
