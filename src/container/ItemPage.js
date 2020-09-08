import React from "react";
import "../styling/ItemPage.css";
import { withRouter } from "react-router-dom";
import Map from "../component/Map";

class ItemPage extends React.Component {
  state = { item: null };

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
        return true;
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
        {/* Container with the photo and Contact Seller button */}
        <div className="six wide column" id="photo-container">
          <div className="ui card raised segment">
            <div className="image">
              <img src={photo} alt={name} />
            </div>
            <div className="content">
              <div className="description">Seller: {username}</div>

              <div className="description">
                {/* When Contact Seller button is clicked, will open email with subject template: "Equip Inquiry Re: <Item Name>" and body of "Hi! I am interested in your posted item: <Item Name>" */}
                <a
                  href={`mailto:${email}?subject=Equip%20Inquiry%20Re:%20${name}&body=Hi!%20I%20am%20interested%20in%20your%20posted%20item:%20${name}`}
                >
                  <div className="ui primary button">Contact Seller</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Container with item's descriptions and map */}
        <div className="ten wide column ui" id="description-container">
          <h1 className="ui header">
            {name} ({condition})
          </h1>
          <h2 className="ui header price">{price ? `$${price}` : `Free`}</h2>
          <div className="info">
            <div>
              <b>Description: </b>
              {description}
            </div>

            <div>
              <b>Available For: </b>

              {pickup ? "✔️ Pickup " : null}
              {pickup && shipping ? " " : null}
              {shipping ? "✔️ Shipping " : null}
            </div>

            <div>
              <b>Category: </b> {category}
            </div>

            <div>
              <b>Location: </b> {city}, {state}, {zip}
            </div>
          </div>

          <Map user={this.state.item.user} zoomLevel={12} />
        </div>
      </div>
    );
  }
}

export default withRouter(ItemPage);
