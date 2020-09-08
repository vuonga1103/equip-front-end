import React from "react";
import Item from "./Item";
import AllItemsFilter from "./AllItemsFilter";
import "../styling/ItemsPage.css";
import ScrollUpButton from "react-scroll-up-button";

class ItemsPage extends React.Component {
  state = {
    sort: "",
    category: "",
    condition: "",
    availability: [],
  };

  // Calls .sortItem() passed down from App.js, where this.state.items in App.js will be sorted according to the sort criteria that was passed in/set
  setSort = (sort) => {
    this.setState({ sort });
    this.props.sortItems(sort);
  };

  // Re-sets category based on input
  setCategory = (category) => {
    this.setState({ category });
  };

  // Re-sets condition based on input
  setCondition = (condition) => {
    this.setState({ condition });
  };

  // Adds to this.state.availability array and re-sets availability (this is called when the user checks either shipping or pickup when filtering)
  addToAvailability = (val) => {
    const availability = [...this.state.availability, val];
    this.setState({ availability });
  };

  // Removes from this.state.availability array and re-sets availability (this is called when the user unchecks either shipping or pickup when filtering)
  removeFromAvailability = (val) => {
    let availability = [...this.state.availability];
    availability = availability.filter((v) => v !== val);
    this.setState({ availability });
  };

  renderItems = () => {
    // Pull out category, condition, availability attributes from this.state
    const { category, condition, availability } = this.state;

    // Filter for inputted category and condition
    let filteredItems = this.props.items
      .filter((i) => i.category.includes(category))
      .filter((i) => {
        // If user doesn't select a condition, should display items in all conditions
        if (condition === "") return i;
        return i.condition === condition;
      });

    // For each of the availabilities (shipping, pickup) in this.state.availability array, filter the filteredItems even further to match the availability
    availability.forEach((filterVal) => {
      filteredItems = filteredItems.filter((item) => item[filterVal]);
    });

    // Map through items and create an item component out of each
    return filteredItems.map((i) => {
      return <Item key={i.id} item={i} />;
    });
  };

  render() {
    return (
      <div className="ui grid container" id="items-page-container">
        <div className="four wide column">
          <AllItemsFilter
            setSort={this.setSort}
            setCategory={this.setCategory}
            setCondition={this.setCondition}
            addToAvailability={this.addToAvailability}
            removeFromAvailability={this.removeFromAvailability}
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
