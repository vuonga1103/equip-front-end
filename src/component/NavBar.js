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

      {/* If user is LOGGED IN, display Home button */}
      {loggedIn ? (
        <div className="item">
          <Link to={"/home"}>Home</Link>
        </div>
      ) : null}

      <div className="item">
        <Link to={"/about"}>About</Link>
      </div>

      {/* If user is NOT LOGGED IN, display the Log In button */}
      <div className="right menu">
        {!loggedIn ? (
          <div className="item">
            <Link to={"/login"}>Log In</Link>
          </div>
        ) : null}

        {/* If the user IS LOGGED IN, display "Logged In As" and the Log Out button; if they are NOT LOGGED IN, display the Sign Up button */}
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
