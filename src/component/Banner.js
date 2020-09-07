import React from "react";
import "../styling/Banner.css";
import { Link } from "react-router-dom";

const Banner = ({ loggedIn }) => {
  return (
    <div className="ui header" id="banner-container">
      <div className="logo">
        {/* If the user is logged in, clickingn on the banner logo will direct them to home page, if they are not logged in clicking there will direct them to the root page with all the items displayed */}
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

      {/* <div className="tagline">
        An Online Marketplace for New and Used Durable Medical Equipment
      </div> */}
    </div>
  );
};

export default Banner;
