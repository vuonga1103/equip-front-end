import React from "react";
import Item from "./Item";
import AllItemsFilter from "./AllItemsFilter";
import "../styling/ItemsPage.css";
import ScrollUpButton from "react-scroll-up-button";

class ItemsPage extends React.Component {
  renderItems = () => {
    return this.props.items.map((i) => {
      return <Item key={i.id} item={i} />;
    });
  };

  render() {
    return (
      <div className="ui grid container" id="items-page-container">
        <div className="four wide column">
          <AllItemsFilter
            getItems={this.props.getItems}
            filters={this.props.filters}
            handleFilterChange={this.props.handleFilterChange}
            sort={this.props.sort}
            handleSort={this.props.handleSort}
          />
        </div>
        <div className="twelve wide column">
          <div className="ui three column grid">{this.renderItems()}</div>
          <ScrollUpButton />
        </div>
      </div>
    );
  }
}

export default ItemsPage;
