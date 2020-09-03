import React from "react";

const NavBar = () => {
  return (
    <nav className="ui huge menu">
      <div className="item">Home</div>
      <div className="item">About</div>
      <div className="right menu">
        <div className="item">Log In</div>
        <div className="item">
          <div className="ui primary button">Sign Up</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
