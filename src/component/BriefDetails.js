import React from "react";

const BriefDetails = ({ item }) => {
  return (
    <div>
      <div className="meta">
        <span>
          {item.pickup ? "☑️ Pick Up" : null}{" "}
          {item.shipping ? "☑️ Shipping" : null}
        </span>
      </div>
      <div className="meta">
        <span>
          {item.user.city}, {item.user.state}{" "}
          {item.user.distance ? `(${item.user.distance} mi away)` : null}
        </span>
      </div>
    </div>
  );
};

export default BriefDetails;
