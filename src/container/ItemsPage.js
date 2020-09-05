import React from "react";
import Item from "./Item";
import AllItemsFilter from "./AllItemsFilter";
import "../styling/ItemsPage.css";

class ItemsPage extends React.Component {
  state = {
    sort: "",
    category: "",
    availability: [],
  };

  setSort = (sort) => {
    this.setState({ sort });
    this.props.sortItems(sort);
  };

  setCategory = (category) => {
    this.setState({ category });
  };

  addToAvailability = (val) => {
    const availability = [...this.state.availability, val];
    this.setState({ availability });
  };

  removeFromAvailability = (val) => {
    let availability = [...this.state.availability];
    availability = availability.filter((v) => v !== val);
    this.setState({ availability });
  };

  renderItems = () => {
    const { category, availability } = this.state;

    let filteredItems = this.props.items.filter((i) =>
      i.category.includes(category)
    );

    availability.forEach((filterVal) => {
      filteredItems = filteredItems.filter((item) => item[filterVal]);
    });

    return filteredItems.map((i) => {
      return (
        <Item
          key={i.id}
          item={i}
          renderItemBriefDetails={this.renderItemBriefDetails}
        />
      );
    });
  };

  render() {
    return (
      <div className="ui grid container" id="items-page-container">
        <div className="four wide column">
          <AllItemsFilter
            setSort={this.setSort}
            setCategory={this.setCategory}
            addToAvailability={this.addToAvailability}
            removeFromAvailability={this.removeFromAvailability}
          />
        </div>
        <div className="twelve wide column">
          <div className="ui three column grid">{this.renderItems()}</div>
        </div>
      </div>
    );
  }
}

export default ItemsPage;
