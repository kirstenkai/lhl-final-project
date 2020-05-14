import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { useAuth0 } from "../react-auth0-spa";

import UploadButton from "./UploadButton";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2, 0),
      width: "75%"
    }
  }
}));
// console.log("What is this", useAuth0);

export default function CreateRecipe() {
  const classes = useStyles();
  const { loading, user } = useAuth0();
  const user_id = "mock";
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const save = e => {
    e.preventDefault();

    // e.preventDefault();

    const name = e.target.elements.title.value;
    const description = e.target.elements.description.value;
    const ingredients = e.target.elements.ingredients.value;
    const instruction = e.target.elements.instructions.value;
    const image = e.target.elements.image.value;

    Axios.post("http://localhost:5000/api/customrecipes", {
      user_id,
      name,
      description,
      ingredients,
      instruction,
      image
    }).then(res => {
      window.location.href = "http://localhost:3000/search";
      console.log("res= ", res);
    });
  };

  const imagefunc = () => {
    console.log("hello");
  };

  return (
    <Fragment>
      <h1>Create Recipe</h1>

      <form
        onSubmit={save}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            name="title"
            id="standard-textarea"
            label="Title"
            multiline
          />
        </div>
        <div>
          <TextField
            name="description"
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            name="ingredients"
            id="outlined-multiline-static"
            label="Ingredients"
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            name="instructions"
            id="outlined-multiline-static"
            label="Instructions"
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            name="image"
            id="outlined-multiline-static"
            label="Image Source URL"
            multiline
            rows={1}
            variant="outlined"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <UploadButton onClick={imagefunc} />
      </form>
    </Fragment>
  );
}
