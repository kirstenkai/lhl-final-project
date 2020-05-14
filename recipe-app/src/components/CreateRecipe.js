import React, {Fragment} from 'react';
import { useAuth0 } from "../react-auth0-spa";
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';

import UploadButton from './UploadButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2,0),
      width: '75%',
    },
  },
}));

export default function CreateRecipe() {
  const classes = useStyles();
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>
  }

  return (
    <Fragment>
      <h1>Create Recipe</h1>
    
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        
        <TextField
          id="standard-textarea"
          label="Title"
          multiline
        />
    
      </div>
      <div>
      <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
        />
        <TextField
          id="outlined-multiline-static"
          label="Ingredients"
          multiline
          rows={4}
          variant="outlined"
        />
        <TextField
          id="outlined-multiline-static"
          label="Instructions"
          multiline
          rows={4}
          variant="outlined"
        />
      </div>
      <Button variant="contained" color="primary">Submit</Button>
    </form>
    <UploadButton />
    </Fragment>
  );
}
