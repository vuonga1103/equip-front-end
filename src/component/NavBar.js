import React from "react";
import "../styling/NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="ui huge menu">
      <Link to={"/"}>
        <div className="item">
          <img
            src="https://img.icons8.com/cotton/100/000000/electric-wheelchair.png"
            alt="Wheelchair logo"
          />
          {"  "}
          <Link to={"/"}>Home</Link>
        </div>
      </Link>

      <div className="item">
        <Link to={"/about"}>About</Link>
      </div>

      <div className="right menu">
        <div className="item">
          <Link to={"/login"}>Log In</Link>
        </div>
        <div className="item">
          <Link to={"/register"}>
            <div className="ui primary button">Sign Up</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
