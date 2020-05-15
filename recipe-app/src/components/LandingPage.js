import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {Link} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

// TO DO
// Add responsive layout for grid components (img displayed above text on mobile view)
const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)',
  },
  image: {
    backgroundImage: 'url(img/flame-uploading.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      '#232946',
    backgroundSize: '450px',
    backgroundPosition: 'center',
  },
  introduction: {
    backgroundColor: '#232946',
    display: 'flex',
    alignItems: 'center',
    color: "#fffffe",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#232946',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    backgroundColor: '#232946',
  },
  submit: {
    backgroundColor: "#fa9ec1",
    "&:hover": {
      backgroundColor: "#d482a2"
    },
    color: "#232946",
    fontWeight: "bold",
    margin: theme.spacing(3, 0, 2),
  },
}));
console.log(makeStyles)
export default function LandingPage() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.introduction}>
        <div className={classes.paper}>
         
          <Typography component="h1" variant="h3">
            Keep track of your pantry.
          </Typography>
          <Typography component="p">
            RecipeApp helps you waste less food by giving you recipes based on the items you currently have in your pantry and when those products expire.  
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
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}
 
