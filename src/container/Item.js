import React from "react";
import "../styling/Item.css";
import { Link, withRouter } from "react-router-dom";
import BriefDetails from "../component/BriefDetails";
import SoldCheckbox from "../component/SoldCheckbox";

class Item extends React.Component {
  state = {
    displayDelete: false,
  };

  toggleSold = (item) => {
    // Toggle sold attribute
    item.sold = !item.sold;

    // Persist to backend, ensuring that the user has appropriate authorization; in backend, will do a double check to make sure that the item belongs to the user
    fetch("http://localhost:4000/items/" + item.id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.token}`,
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((item) => {
        if (!item.error) {
          // This re-sets this.state.items in App.js so that the item is either added or removed from root page based on if it is sold or not
          this.props.addOrRemoveItem(item);
        } else {
          console.log(item.error);
        }
        return true;
      });
  };

  handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch("http://localhost:4000/items/" + item.id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.token}`,
        },
      })
        .then((response) => response.json())
        .then((item) => {
          this.props.removeFromUserItems(item);
        });
    }
  };

  render() {
    // withRouter gives access to location; can access the pathname via location.pathname
    const location = this.props.location;

    // The seller is logged in if a token exists in local storage and if the current path is /seller; we use this to determine if the item card should have a sold toggle or if it should have brief details
    const sellerLoggedIn =
      !!localStorage.getItem("token") && location.pathname === "/seller";

    const item = this.props.item;

    return (
      <div className="column">
        <div
          className="ui fluid card"
          id="item-card"
          onMouseEnter={() => this.setState({ displayDelete: true })}
          onMouseLeave={() => this.setState({ displayDelete: false })}
        >
          {sellerLoggedIn && this.state.displayDelete ? (
            <>
              <Link to={`/edit-item/${item.id}`}>
                <i className="edit icon large" id="item-edit-icon"></i>
              </Link>

              <i
                className="times circle icon large"
                id="item-delete-icon"
                onClick={() => this.handleDelete(item)}
              ></i>
            </>
          ) : null}
          {/* Photo of item */}
          <Link to={`/item-page/${item.id}`}>
            <div className="image">
              <img src={item.photo} alt={item.name} />
            </div>
          </Link>

          {/* Heading to display name and price of item */}
          <div className="content">
            <Link to={`/item-page/${item.id}`}>
              <div className="header">
                {item.name} - {item.price ? `$${item.price}` : `Free`}
              </div>
            </Link>

            {/* If user is in root, display brief details */}
            {location.pathname === "/" ? <BriefDetails item={item} /> : null}

            {/* If the seller is logged in and is in /seller, then display the sold checkbox to give seller access to marking an item as sold */}
            {sellerLoggedIn ? (
              <SoldCheckbox item={item} toggleSold={this.toggleSold} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Item);
