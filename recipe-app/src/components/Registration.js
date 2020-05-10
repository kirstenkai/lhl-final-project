// import React from "react";

// const Registration = () => {
//   const register = e => {
//     e.preventDefault();
//     console.log("register");
//   };

//   return (
//     <div>
//       <h2>Registration Page</h2>
//       <form className="registration-form" onSubmit={register}>
//         <div>
//           <p>First Name</p>
//           <input
//             type="text"
//             placeholder="First Name"
//             autoFocus
//             className="text-input"
//           />
//         </div>
//         <div>
//           <p>Last Name</p>
//           <input
//             type="text"
//             placeholder="Last Name"
//             autoFocus
//             className="text-input"
//           />
//         </div>
//         <div>
//           <p>E-mail</p>
//           <input
//             type="text"
//             placeholder="E-mail"
//             autoFocus
//             className="text-input"
//           />
//         </div>
//         <div>
//           <p>Password</p>
//           <input
//             type="password"
//             placeholder="Password"
//             autoFocus
//             className="text-input"
//           />
//         </div>
//         <button className="button"> Sign up!</button>
//       </form>
//     </div>
//   );
// };

// export { Registration as default };

// <form className="registration" method="POST" action="/">
// <div class="container">
//   <div className="first-name">
//     <b>First Name</b>>
//     <input
//       type="text"
//       placeholder="Enter First Name"
//       name="name"
//       required
//     />
//   </div>

//   <div className="last-name">
//     <b>Last Name</b>

//     <input
//       type="text"
//       placeholder="Enter Last Name"
//       name="name"
//       required
//     />
//   </div>

//   <div className="e-mail">
//     <b>E-mail</b>>
//     <input
//       type="text"
//       placeholder="Enter Last Name"
//       name="name"
//       required
//     />
//   </div>

//   <div className="password">
//     <b>Password</b>>
//     <input
//       type="password"
//       placeholder="Enter Password"
//       name="password"
//       required
//     />
//   </div>

//   <div>
//     <button type="submit">Register</button>
//     <input type="checkbox" checked="checked" name="remember" /> Remember
//     me
//   </div>
// </div>
// </form>
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Registration() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}