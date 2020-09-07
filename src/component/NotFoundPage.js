import React from "react";
import "../styling/NotFoundPage.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div id="not-found-container">
      <div className="ui piled segment">
        <h1 className="ui header">Page Not Found</h1>
        <h3 className="ui header">
          We're sorry. The page you requested could not be found.
        </h3>
        <Link to={"/"}>
          <div className="ui primary button">Go Back Home</div>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
