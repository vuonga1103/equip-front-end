import React from "react";
import "../styling/Item.css";

const Item = ({ item }) => {
  return (
    <div className="column">
      <div className="ui fluid card">
        <div className="image">
          <img src={item.photo} alt={item.name} />
        </div>
        <div className="content">
          <div className="header">
            {item.name} - {item.price ? `$${item.price}` : `Free`}
          </div>
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
