import React from "react";
import "../styling/HomePage.css";
import { Link } from "react-router-dom";

const HomePage = ({ user: { username } }) => {
  return (
    <div className="buttons-container">
      <h2 className="ui header">Welcome to Equip, {username}!</h2>

      <h4 className="ui header">What Would You Like To Do?</h4>
      <Link to={"/seller"}>
        <button className="fluid ui button primary">View My Items</button>
      </Link>

      <Link to={"/"}>
        <button className="fluid ui button primary">Shop All Items</button>
      </Link>

      <Link to={"/edit"}>
        <button className="fluid ui button primary">Edit My Account</button>
      </Link>
    </div>
  );
};

export default HomePage;
