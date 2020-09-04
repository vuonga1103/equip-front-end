import React from "react";
import "../styling/Item.css";
import { Link, useLocation } from "react-router-dom";

const Item = ({ item, renderItemBriefDetails }) => {
  let location = useLocation();

  // if the location.pathname is /seller AND there is a user logged in, then don't display the pickup/shipping, instead have a toggle checkbox that says sold

  return (
    <div className="column">
      <div className="ui fluid card" id="item-card">
        <Link to={`/item-page/${item.id}`}>
          <div className="image">
            <img src={item.photo} alt={item.name} />
          </div>
        </Link>
        <div className="content">
          <Link to={`/item-page/${item.id}`}>
            <div className="header">
              {item.name} - {item.price ? `$${item.price}` : `Free`}
            </div>
          </Link>

          {location.pathname === "/" ? renderItemBriefDetails(item) : null}

          {/* <div className="ui toggle checkbox">
            <input type="checkbox" name="public" />
            <label>Mark as Sold</label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Item;
