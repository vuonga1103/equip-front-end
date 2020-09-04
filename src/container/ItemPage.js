import React from "react";
import "../styling/ItemPage.css";
import { withRouter } from "react-router-dom";

class ItemPage extends React.Component {
  state = {
    item: null,
  };

  // Once component mounts, make a fetch for the item with the id we get from this.props.match.params.id, which is something we get for free from the Route (/item-page/:id); also we are able to access additional props thanks to withRouter from "react-router-dom"
  componentDidMount() {
    this.getItem();
  }

  getItem = () => {
    const id = this.props.match.params.id;

    fetch("http://localhost:4000/items/" + id)
      .then((response) => response.json())
      .then((result) => {
        // If we don't get back an error, then set the state for the item accordingly, otherwise take user to the not-found page; we are able to use this.props.history.push() also thanks to withRouter
        if (!result.error) {
          this.setState({ item: result });
        } else {
          this.props.history.push("/not-found");
        }
      });
  };

  render() {
    // Guard clause for early exit if this.state.item has not yet been set
    if (!this.state.item) return null;

    const {
      category,
      condition,
      description,
      name,
      photo,
      pickup,
      price,
      shipping,
      user: { city, email, state, username, zip },
    } = this.state.item;

    return (
      <div className="ui grid container" id="item-page-container">
        <div className="six wide column ">
          <div className="ui card raised segment">
            <div className="image">
              <img src={photo} alt={name} />
            </div>
            <div className="content">
              <div className="description">Seller: {username}</div>
              <div className="description">
                {city}, {state}, {zip}
              </div>
              <div className="description">
                <a
                  href={`mailto:${email}?subject=Equip%20Inquiry%20Re:%20${name}&body=Hi%20I%20am%20interested%20in%20your%20posted%20item:%20${name}`}
                >
                  Contact Seller
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="ten wide column ui raised segment">
          <h1 className="ui header">
            {name.toUpperCase()} ({condition})
          </h1>
          <h3 className="ui header">{price ? `$${price}` : `Free`}</h3>
          <p className="info">
            <b>Description: </b>
            {description}
            <br />
            <br />
            {pickup ? "✔️ Available for Pickup " : null}
            {shipping ? "✔️ Available for Shipping " : null}
            <br />
            <br />
            <b>Category: </b> {category}
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(ItemPage);
