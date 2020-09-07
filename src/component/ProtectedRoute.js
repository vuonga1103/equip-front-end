import React from "react";
import { Route, Redirect } from "react-router-dom";

// Custom created ProtectedRoute that takes in props component, path, and possibly misc. other props.
const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  // User is logged in if there is a detected token in localStorage
  const loggedIn = !!localStorage.getItem("token");

  // Create a Route component to return
  return (
    <Route
      // The path of the route is the path passed into ProtectedRoute as props
      path={path}
      // Rendering call back function that will return the component that was passed into ProtectedRoute if user is logged in; will redirect user to root page if not logged in
      render={() => (loggedIn ? <Comp {...rest} /> : <Redirect to="/" />)}
    />
  );
};

export default ProtectedRoute;
