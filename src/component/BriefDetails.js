import React from "react";

const BriefDetails = ({ item }) => {
  const {
    pickup,
    shipping,
    user: { city, state, distance },
  } = item;

  return (
    <div>
      <div className="meta">
        <span>
          {pickup ? "☑️ Pick Up" : null} {shipping ? "☑️ Shipping" : null}
        </span>
      </div>
      <div className="meta">
        <span>
          {city}, {state} {distance ? `(${distance} mi away)` : null}
        </span>
      </div>
    </div>
  );
};

export default BriefDetails;
