import React from "react";

class AllItemsFilter extends React.Component {
  handleChange = (e) => {
    const { name, value, checked } = e.target;
    const {
      setSort,
      setCategory,
      addToAvailability,
      removeFromAvailability,
    } = this.props;

    if (name === "sort") {
      setSort(value);
    } else if (name === "category") {
      setCategory(value);
    } else {
      checked ? addToAvailability(name) : removeFromAvailability(name);
    }
  };

  render() {
    return (
      <div>
        <div className="field">
          <label>Sort Equipment:</label>
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

        <div>
          <div>Filter by Availability:</div>
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

          <div className="field">
            <label>Filter by Category: </label>
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
        </div>
      </div>
    );
  }
}

export default AllItemsFilter;
