import React from "react";
import "../styling/Item.css";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
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
          <div className="meta">
            <span>
              {item.pickup ? "☑️ Pick Up" : null}{" "}
              {item.shipping ? "☑️ Shipping" : null}
            </span>
          </div>
          <div className="meta">
            <span>
              {item.user.city}, {item.user.state}, {item.user.zip}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
