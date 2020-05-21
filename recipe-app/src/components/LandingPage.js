import React from "react";
import Button from "@material-ui/core/Button";
//import Paper from "@material-ui/core/Paper";
//import Box from "@material-ui/core/Box";
//import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

// TO DO
// Add responsive layout for grid components (img displayed above text on mobile view)
const useStyles = makeStyles(theme => ({
  root: {
    height: "calc(100vh - 64px)",
    background:
      "linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.1)), url(img/landingpage.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "center"
  },

  introduction: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "20em",
    "& h1, h3": {
      padding: "20px 0"
    },
    "& h3": {
      fontSize: "18px",
      color: "dimgray"
    }
  },
  submit: {
    backgroundColor: "#00C853",
    fontSize: "18px",
    fontWeight: "900",
    "&:hover": {
      backgroundColor: "#00C853"
    },
    color: "#fff",
    fontWeight: "900",
    margin: theme.spacing(3, 0, 2),
    width: "40%",
    padding: "20px 15px"
  }
}));
//console.log(makeStyles)
export default function LandingPage() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    // <Grid
    // container
    // component="main"
    // justify="flex-start"
    // margin
    // className={`${classes.root} $ ${classes.image}`}
    // >
    <div className={classes.root}>
      <div className={classes.introduction}>
        <Typography component="h2" variant="h4">
          Don't let your food products go to waste. Let{" "}
          <strong>Kitchen Hero</strong> save your day.
        </Typography>
        <Typography
          className="introduction-paragraph"
          component="h3"
          variant="p"
        >
          With Kitchen Hero, you will no longer have to throw away leftover
          ingredients, nor struggle with figuring out what kind of recipe you
          can make with them. Not only can you search for recipes based on the
          ingredients you have, you can also save them in case you would like to
          come back to these recipes again. Kitchen Hero also allows you to
          create and customize your own beloved recipes, and as well keep track
          of what is in your inventory and their expiry date. Sign up to become
          a Kitchen Hero today!
        </Typography>
        {/* {!isAuthenticated && (
            // <button >Log in</button>
          )} */}
        <Button
          onClick={() => loginWithRedirect({})}
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Get Started!
        </Button>
        {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      </div>
    </div>
  );
}

// <Grid item xs={12} sm={8} md={5} className={classes.introduction}>
// <div className={classes.paper}>
