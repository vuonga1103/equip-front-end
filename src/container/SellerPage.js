import React from "react";
import "../styling/SellerPage.css";

class SellerPage extends React.Component {
  render() {
    return (
      <div className="ui grid">
        <div className="six wide column">
          blah blab blah blah blab blahblah blab blah
        </div>
        <div className="ten wide column">
          blah blab blah blah blab blahblah blab blah
        </div>
        <div className="sixteen wide column">
          <div className="ui four column grid">
            blah blab blah blah blab blahblah blab blah
          </div>
        </div>
      </div>
    );
  }
}

export default SellerPage;
