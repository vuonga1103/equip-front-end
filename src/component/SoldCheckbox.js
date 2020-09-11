import React from "react";

const SoldCheckbox = ({ item, toggleSold }) => {
  return (
    <div className="ui toggle checkbox" style={{ marginTop: "5px" }}>
      <input
        type="checkbox"
        name="public"
        // Call toggleSold which will change the item's sold attribute to the oppposite of what it is and persist to the backend
        onChange={() => toggleSold(item)}
        // If item is sold, toggle checkbox is checked
        checked={item.sold}
      />
      <label>{item.sold ? "Item Sold!" : "Mark As Sold"}</label>
    </div>
  );
};

export default SoldCheckbox;
