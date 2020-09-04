import React from "react";
import "../styling/SellerPage.css";
import { Link } from "react-router-dom";
import Item from "../component/Item";

class SellerPage extends React.Component {
  renderUserItems = () => {
    return this.props.usersItems().map((i) => {
      return <Item key={i.id} item={i} />;
    });
  };

  render() {
    return (
      <div className="ui grid" id="seller-page-container">
        <div className="six wide column">
          <Link to={"/new-item"}>
            <button className="fluid ui button primary">Add New Item</button>
          </Link>
        </div>
        <div className="ten wide column">
          sorting stuff for items here sorting stuff for items here sorting
          stuff for items here
        </div>
        <div className="sixteen wide column">
          <div className="ui three column grid">
            {this.renderUserItems()}
            here is where we display the items here is where we display the
            items here is where we display the items here is where we display
            the items here is where we display the items here is where we
            display the items here is where we display the items here is where
            we display the items here is where we display the items here is
            where we display the items here is where we display the items here
            is where we display the items here is where we display the items
          </div>
        </div>
      </div>
    );
  }
}

export default SellerPage;
