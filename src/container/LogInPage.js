import React from "react";
import "../styling/LogInPage.css";
import { withRouter } from "react-router-dom";

class LogInPage extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((result) => {
        if (this.props.handleResponse(result)) {
          this.props.history.push("/home");
        }
      });
  };

  render() {
    const { password, username } = this.state;

    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>USERNAME</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleInput}
          />
        </div>
        <div className="field">
          <label>PASSWORD</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleInput}
          />
        </div>
        <button className="ui button" type="submit">
          Log In
        </button>
      </form>
    );
  }
}

export default withRouter(LogInPage);
