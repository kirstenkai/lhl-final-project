// When a user is logged in, they will be able to see their profile containing their information (name and profile picture)

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Typography, Container } from "@material-ui/core";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "63px",
    width: "100%"
  }
}));

const Profile = () => {
  const { loading, user } = useAuth0();

  const classes = useStyles();

  // Show the loading state if the page is loading or if there is no user currently authenticated
  if (loading || !user) {
    return <div>Loading...</div>;
  }
  // This will return the user's picture/avatar, name, and email
  return (
    <Container maxWidth="lg">
      <Fragment>
        <Typography>
          <h1>My Profile</h1>
        </Typography>
        <img
          src={
            "https://storage.cloud.google.com/final_project_recipeapp/avatar.jpg?folder&organizationId"
          }
          alt="Profile"
        />

        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <code>{JSON.stringify(user, null, 2)}</code>
      </Fragment>
    </Container>
  );
};

export default Profile;
