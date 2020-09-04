import React from "react";
import "../styling/LogInPage.css";
import { withRouter } from "react-router-dom";

class LogInPage extends React.Component {
  state = {
    username: "",
    password: "",
  };

  // For form control, set the state for username/password on each change detected
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post request to /login, sending the username and password from this.state; backend will take care of authenticating the user with the username and password inputted, making a token, and sending back a result in {user: {}, token: "..."} object format
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
        // Once result comes back, we handle the result by setting this.state.user and this.state.token in App.js accordingly, as well as storing the token we got back in localStorage so as to avoid logging the user out with page refresh; after that we bring the user to /home
        if (this.props.handleResponse(result)) {
          this.props.history.push("/home");
        }
      });
  };

  render() {
    const { password, username } = this.state;

    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <h4 className="ui dividing header">Log In</h4>
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleInput}
          />
        </div>
        <div className="field">
          <label>Password</label>
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
