import React from "react";
import { Route, Redirect } from "react-router-dom";

// Custom created ProtectedRoute that takes in props component, path, and possibly misc. other props. Create a Route component to return, with the path leading to path passed in; and render with a callback function that will return the passed in component if we are logged in, or will redirect back to "/" if we are not
const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return localStorage.getItem("token") ? (
          <Comp {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default ProtectedRoute;
