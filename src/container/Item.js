import React from "react";
import "../styling/Item.css";
import { Link, withRouter } from "react-router-dom";
import BriefDetails from "../component/BriefDetails";
import SoldCheckbox from "../component/SoldCheckbox";

class Item extends React.Component {
  state = {
    sold: null,
  };

  toggleSold = (item) => {
    item.sold = !item.sold;

    fetch("http://localhost:4000/items/" + item.id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((item) => {
        const sold = item.sold;
        this.setState({ sold });
      });
  };

  render() {
    const location = this.props.location;
    const sellerLoggedIn =
      !!localStorage.getItem("token") && location.pathname === "/seller";
    const item = this.props.item;

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

            {location.pathname === "/" ? <BriefDetails item={item} /> : null}

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
