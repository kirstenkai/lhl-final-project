import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import { FacebookShareButton } from "react-share";
import { FacebookIcon } from "react-share";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    maxHeight: "80vh",
    overflow: "auto"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard({
  title,
  image,
  description,
  id,
  e,
  translate,
  ingredients,
  instructions,
  sourceUrl,
  instructionsTitle,
  translateSpoonacular,
  children
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onClick = () => {
    translateSpoonacular();
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={title} id={id} subheader="September 14, 2016" />
      <CardMedia className={classes.media} image={image} title="Paella dish" />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          paragraph
          dangerouslySetInnerHTML={{ __html: description }}
        ></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <FacebookShareButton sourceUrl={sourceUrl} children={children} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients:</Typography>
          <Typography paragraph ingredients={ingredients}>
            {ingredients}
          </Typography>

          <Typography
            paragraph
            instructionsTitle={instructionsTitle}
            instructions={instructions}
          >
            {instructions}
          </Typography>
          <button type="button" onClick={() => onClick}>
            Japanese
          </button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
