import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper } from "@material-ui/core";
import { useAuth0 } from "../react-auth0-spa";

import UploadButton from "./UploadButton";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    maxWidth: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url(img/inventory.jpg)",
    height: "100vh",
  },
  paper: {
    width: "70%",
    padding: "0 50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& *": {
      margin: "5px 0",
    },
  },
  actions: {
    width: "65%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default function CreateRecipe() {
  const classes = useStyles();
  const { loading, user } = useAuth0();
  const user_id = user.email;

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const save = (e) => {
    e.preventDefault();

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
      image,
    }).then((res) => {
      window.location.href = "http://localhost:3000/saved";
    });
  };

  const imagefunc = () => {
    console.log("test image function");
  };

  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.paper} fullWidth>
        <h1>Create Recipe</h1>

        <form
          onSubmit={save}
          noValidate
          autoComplete="off"
          className={classes.form}
        >
          <TextField
            name="title"
            id="standard-textarea"
            label="Title"
            multiline
            variant="outlined"
            fullWidth
          />
          <TextField
            name="description"
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
          <TextField
            name="ingredients"
            id="outlined-multiline-static"
            label="Ingredients"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
          <TextField
            name="instructions"
            id="outlined-multiline-static"
            label="Instructions"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
          <TextField
            name="image"
            id="outlined-multiline-static"
            label="Image Source URL"
            multiline
            rows={1}
            variant="outlined"
            fullWidth
          />
          <div className={classes.actions}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <UploadButton onClick={imagefunc} />
          </div>
        </form>
      </Paper>
    </div>
  );
}
