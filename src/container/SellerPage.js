import React from "react";
import "../styling/SellerPage.css";
import { Link, withRouter } from "react-router-dom";
import Item from "./Item";
import MyItemsFilter from "../component/MyItemsFilter";
import BackButton from "../component/BackButton";
import { BACKEND_BASE_URL } from "../utils/constants";

class SellerPage extends React.Component {
  state = {
    userItems: [],
    soldFilter: "",
  };

  componentDidMount() {
    this.getUserItems();
  }

  // Fetch database for all items that belong to the user and set them in this.state.userItems
  getUserItems() {
    fetch(`${BACKEND_BASE_URL}/user-items`, {
      headers: {
        Authorization: `bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((userItems) => {
        this.setState({ userItems });
        return true;
      });
  }

  // Is called in MyItemsFilter, when the user selects a filter option for sold or not-sold; set this.state.soldFilter to whatever the user selected
  setFilter = (e) => {
    const soldFilter = e.target.value;
    this.setState({ soldFilter });
  };

  // Displays the user's items, filtering for the soldFilter state
  renderUserItems = () => {
    let myFilteredItems = this.state.userItems;

    if (this.state.soldFilter === "sold") {
      myFilteredItems = this.state.userItems.filter((i) => i.sold);
    }

    if (this.state.soldFilter === "not-sold") {
      myFilteredItems = this.state.userItems.filter((i) => !i.sold);
    }

    return myFilteredItems.map((i) => {
      return (
        <Item
          key={i.id}
          item={i}
          // Passing on addOrRemoveItem prop, which will add or remove the item from root page depending on its sold status
          addOrRemoveItem={this.props.addOrRemoveItem}
          removeFromUserItems={this.removeFromUserItems}
          removeItem={this.props.removeItem}
        />
      );
    });
  };

  removeFromUserItems = (item) => {
    const userItems = this.state.userItems.filter((i) => i.id !== item.id);
    this.setState({ userItems });
  };

  render() {
    return (
      <div className="ui grid container" id="seller-page-container">
        <div className="four wide column">
          {/* Button to add new item */}
          <Link to={"/new-item"}>
            <button className="fluid ui button primary">
              Add New Item For Sale
            </button>
          </Link>

          {/* Filter for sold or unsold items */}
          <MyItemsFilter
            soldFilter={this.state.soldFilter}
            setFilter={this.setFilter}
          />
          <BackButton />
        </div>
        <div className="twelve wide column">
          {/* Display of the logged in user's items */}
          <div className="ui three column grid">{this.renderUserItems()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(SellerPage);
