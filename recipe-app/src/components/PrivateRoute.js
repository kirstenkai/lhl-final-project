// This component will serve as a wrapper for the Profile component. 
// It ensures that when a user is not logged in and try to access this page, the site will redirect them to the log in prompt.
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: {targetUrl: window.location.pathname}
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;