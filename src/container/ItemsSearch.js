import React from "react";

const ItemsSearch = ({ search, setSearch }) => {
  return (
    <div className="ui search">
      <div className="ui icon input">
        <input
          className="prompt"
          type="text"
          placeholder="Search By Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="search icon"></i>
      </div>
      <div className="results"></div>
    </div>
  );
};

export default ItemsSearch;
