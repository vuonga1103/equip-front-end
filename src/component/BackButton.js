import React from "react";
import { withRouter } from "react-router-dom";
import "../styling/BackButton.css";

class BackButton extends React.Component {
  render() {
    return (
      <div onClick={() => this.props.history.goBack()} className="back-btn">
        <i className="arrow alternate circle left icon big"></i>
      </div>
    );
  }
}

export default withRouter(BackButton);
