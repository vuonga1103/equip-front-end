import React from "react";
import "../styling/SellerPage.css";
import { Link } from "react-router-dom";
import Item from "./Item";
import MyItemsFilter from "../component/MyItemsFilter";

class SellerPage extends React.Component {
  state = {
    userItems: [],
    soldFilter: "",
  };

  componentDidMount() {
    this.getUserItems();
  }

  getUserItems() {
    fetch("http://localhost:4000/user-items", {
      headers: {
        Authorization: `bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((userItems) => {
        this.setState({ userItems });
      });
  }

  setFilter = (e) => {
    const soldFilter = e.target.value;
    this.setState({ soldFilter });
  };

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
          addOrRemoveItem={this.props.addOrRemoveItem}
        />
      );
    });
  };

  render() {
    return (
      <div className="ui grid container" id="seller-page-container">
        <div className="four wide column">
          <Link to={"/new-item"}>
            <button className="fluid ui button primary">
              Add New Item For Sale
            </button>
          </Link>
          <MyItemsFilter
            soldFilter={this.state.soldFilter}
            setFilter={this.setFilter}
          />
        </div>
        <div className="twelve wide column">
          <div className="ui three column grid">{this.renderUserItems()}</div>
        </div>
      </div>
    );
  }
}

export default SellerPage;
