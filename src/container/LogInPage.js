import React from "react";
import "../styling/LogInPage.css";

class LogInPage extends React.Component {
  render() {
    return (
      <form className="ui form">
        <div className="field">
          <label>USERNAME</label>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div className="field">
          <label>PASSWORD</label>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <button className="ui button" type="submit">
          Log In
        </button>
      </form>
    );
  }
}

export default LogInPage;
