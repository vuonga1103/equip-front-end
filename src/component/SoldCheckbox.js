import React from "react";

const SoldCheckbox = ({ item, toggleSold }) => {
  return (
    <div className="ui toggle checkbox">
      <input
        type="checkbox"
        name="public"
        onChange={() => toggleSold(item)}
        checked={item.sold}
      />
      <label>{item.sold ? "Item Sold!" : "Mark As Sold"}</label>
    </div>
  );
};

export default SoldCheckbox;
