// import React from 'react';

// export default function LandingPage() {
//   return (

//     <div>
//       <h1>Keep track of your pantry.</h1>
//       <p>I'm baby normcore vexillologist tilde tofu meh cray tumeric brooklyn hoodie next level pop-up bushwick. Chartreuse lyft everyday carry, skateboard polaroid celiac woke crucifix ramps kitsch. Tbh cold-pressed man bun ethical, retro art party gastropub lyft jianbing knausgaard bicycle rights kombucha skateboard literally. Pok pok hoodie af pour-over. Pickled single-origin coffee jean shorts paleo selvage offal wolf glossier deep v vexillologist tattooed 8-bit la croix. Stumptown tote bag small batch keytar skateboard food truck.</p>
//       <button>Get Started!</button>
//     </div>
//   )
// }

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(img/flame-uploading.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      '#232946',
    backgroundSize: '450px',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
         
          <Typography component="h1" variant="h5">
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
            color="primary"
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
 
