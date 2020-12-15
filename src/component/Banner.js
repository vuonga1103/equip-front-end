import React from "react";
import "../styling/Banner.css";
import { Link } from "react-router-dom";

const Banner = ({ loggedIn }) => {
  return (
    <div className="ui header" id="banner-container">
      <div className="logo">
        <Link to={loggedIn ? "/home" : "/"}>
          <span className="logo-img">
            <img
              src="https://img.icons8.com/cotton/150/000000/electric-wheelchair.png"
              alt="Equip Logo, a wheelchair"
            />
          </span>

          <span className="logo-text">equip</span>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
