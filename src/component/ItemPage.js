import React from "react";
import "../styling/ItemPage.css";

const ItemPage = ({ item }) => {
  return (
    <div className="ui grid container">
      <div className="six wide column ">
        <div className="ui card raised segment">
          <div className="image">
            <img src={item.photo} alt={item.name} />
          </div>
          <div className="content">
            <div className="description">Seller: {item.user.username}</div>
            <div className="description">
              {item.user.city}, {item.user.state}, {item.user.zip}
            </div>
            <div className="description">
              <a
                href={`mailto:${item.user.email}?subject=Equip%20Inquiry%20Re:%20${item.name}&body=Hi%20I%20am%20interested%20in%20your%20posted%20item:%20${item.name}`}
              >
                Contact Seller
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="ten wide column ui raised segment">
        <h1 className="ui header">
          {item.name.toUpperCase()} ({item.condition})
        </h1>
        <h3 className="ui header">{item.price ? `$${item.price}` : `Free`}</h3>
        <p className="info">
          <b>Description: </b>
          {item.description}
          <br />
          <br />
          {item.pickup ? "✔️ Available for Pickup " : null}
          {item.shipping ? "✔️ Available for Shipping " : null}
          <br />
          <br />
          <b>Category: </b> {item.category}
        </p>
      </div>
    </div>
  );
};

export default ItemPage;
