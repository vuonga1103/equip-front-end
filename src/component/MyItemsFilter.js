import React from "react";
import "../styling/MyItemsFilter.css";

const MyItemsFilter = ({ soldFilter, setFilter }) => {
  return (
    <div className="field" id="my-items-filter">
      <div className="subheading">Filter Your Items By...</div>
      <select
        className="ui fluid dropdown"
        name="category"
        value={soldFilter}
        onChange={setFilter}
      >
        <option value="">Select Filter</option>
        <option value="sold">Items Sold</option>
        <option value="not-sold">Items Not Yet Sold</option>
      </select>
    </div>
  );
};

export default MyItemsFilter;
