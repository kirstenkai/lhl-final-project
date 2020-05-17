import React from 'react';
import Button from '@material-ui/core/Button';
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
    background: 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(img/landing.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  introduction: {
    display: 'flex',
    alignItems: 'center',
    color: "#000",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    backgroundColor: "#000",
    "&:hover": {
      backgroundColor: "#000"
    },
    color: "#fff",
    fontWeight: "bold",
    margin: theme.spacing(3, 0, 2),
  },
}));
//console.log(makeStyles)
export default function LandingPage() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <Grid container component="main" justify="center" className={`${classes.root} $ ${classes.image}`}>
      <Grid item xs={12} sm={8} md={5}  className={classes.introduction}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            Keep track of your pantry.
          </Typography>
          <Typography component="h3" variant="p">
          I'm baby +1 XOXO aesthetic, jean shorts affogato copper mug keffiyeh selvage snackwave shoreditch gastropub cray small batch hexagon. Kinfolk shaman deep v heirloom 3 wolf moon tofu meggings etsy coloring book bespoke small batch. Yuccie hashtag green juice, af actually man braid edison bulb bushwick pop-up fashion axe waistcoat hammock truffaut. Etsy chia artisan marfa portland.
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
      </Grid>
    </Grid>
  );
}
 
