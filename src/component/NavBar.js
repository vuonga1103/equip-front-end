import React from "react";
import "../styling/NavBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ loggedIn, handleLogOut, username }) => {
  return (
    <nav className="ui huge menu">
      <Link to={"/"}>
        <div className="item">
          <img
            src="https://img.icons8.com/cotton/100/000000/electric-wheelchair.png"
            alt="Wheelchair logo"
          />
        </div>
      </Link>

      {loggedIn ? (
        <div className="item">
          <Link to={"/home"}>Home</Link>
        </div>
      ) : null}

      <div className="item">
        <Link to={"/about"}>About</Link>
      </div>

      <div className="right menu">
        {!loggedIn ? (
          <div className="item">
            <Link to={"/login"}>Log In</Link>
          </div>
        ) : null}

        {loggedIn ? (
          <div className="item" id="logged-in-as">
            <div style={{ marginRight: "4px" }}>Logged In As</div>
            <Link to={"/seller"}>{username}</Link>
          </div>
        ) : null}

        <div className="item">
          {loggedIn ? (
            <div className="ui primary button" onClick={handleLogOut}>
              Log Out
            </div>
          ) : (
            <Link to={"/register"}>
              <div className="ui primary button">Sign Up</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
