import React from "react";
import "../styling/AllItemsFilter.css";

class AllItemsFilter extends React.Component {
  // Handles change of sorting/filtering inputs; calls function to change states of sort, category, condition, availability in ItemsPage based on what user inputted
  handleChange = (e) => {
    const { name, value, checked } = e.target;
    const {
      setSort,
      setCategory,
      setCondition,
      addToAvailability,
      removeFromAvailability,
    } = this.props;

    switch (name) {
      case "sort":
        setSort(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "condition":
        setCondition(value);
        break;
      default:
        // Default is shipping/pickup availability
        checked ? addToAvailability(name) : removeFromAvailability(name);
    }
  };

  render() {
    return (
      <div id="all-items-filter-container">
        <h4 className="ui header">Sort or Filter</h4>
        <div className="field">
          <div className="subheading">Sort Equipment:</div>
          <select
            className="ui fluid dropdown"
            name="sort"
            onChange={this.handleChange}
          >
            <option value="">Select Sort Criteria</option>
            <option value="low-to-high">Price: Low-to-High</option>
            <option value="high-to-low">Price: High-to-Low</option>
            <option value="location">Location: Near Me</option>
          </select>
        </div>

        <div className="field">
          <div className="subheading">Filter by Availability:</div>
          <div className="ui slider checkbox">
            <input
              type="checkbox"
              name="shipping"
              onChange={this.handleChange}
            />
            <label>Shipping</label>
          </div>
          <div className="ui slider checkbox">
            <input type="checkbox" name="pickup" onChange={this.handleChange} />
            <label>Pickup</label>
          </div>
        </div>

        <div className="field">
          <div className="subheading">Filter by Category: </div>
          <select
            className="ui fluid dropdown"
            name="category"
            onChange={this.handleChange}
          >
            <option value="">Select Category</option>
            <option value="Wheelchairs & Scooters">
              Wheelchairs & Scooters
            </option>
            <option value="Walking Aids">Walking Aids</option>
            <option value="Beds & Lifts">Beds & Lifts</option>
            <option value="Bath & Shower">Bath & Shower</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="field">
          <div className="subheading">Filter by Condition: </div>
          <select
            className="ui fluid dropdown"
            name="condition"
            onChange={this.handleChange}
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Worn">Worn</option>
          </select>
        </div>
      </div>
    );
  }
}

export default AllItemsFilter;
