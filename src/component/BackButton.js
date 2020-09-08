import React from "react";
import { withRouter } from "react-router-dom";

class BackButton extends React.Component {
  render() {
    return (
      <div onClick={() => this.props.history.goBack()} className="back-btn">
        <img
          src="https://img.icons8.com/color/48/000000/circled-left-2.png"
          alt="back arrow button"
          style={{ cursor: "pointer" }}
        />
      </div>
    );
  }
}

export default withRouter(BackButton);
