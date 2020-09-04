import React from "react";
import "../styling/Banner.css";
import { Link } from "react-router-dom";

const Banner = ({ loggedIn }) => {
  return (
    <div className="ui header">
      <Link to={loggedIn ? "/home" : "/"}>
        <div className="logo">
          <span className="logo-img">
            <img
              src="https://img.icons8.com/cotton/150/000000/electric-wheelchair.png"
              alt="Equip Logo, a wheelchair"
            />
          </span>

          <span className="logo-text">equip</span>
        </div>
      </Link>

      <div className="tagline">
        An Online Marketplace for New and Used Durable Medical Equipment
      </div>
    </div>
  );
};

export default Banner;
