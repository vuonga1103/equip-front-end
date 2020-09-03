import React from "react";

const Banner = () => {
  return (
    <div className="ui header">
      <div className="logo">
        <span classname="logo-img">
          <img
            src="https://img.icons8.com/cotton/150/000000/electric-wheelchair.png"
            alt="Equip Logo, a wheelchair"
          />
        </span>
        <span className="logo-text">equip</span>
      </div>

      <div className="tagline">
        An Online Market Place for New and Used Durable Medical Equipment
      </div>
    </div>
  );
};

export default Banner;
