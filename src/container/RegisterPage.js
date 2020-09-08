import React from "react";
import "../styling/RegisterPage.css";
import { withRouter } from "react-router-dom";
import Form from "../component/Form";

class RegisterPage extends React.Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: "",
    city: "",
    state: "",
    zip: "",
    email: "",
  };

  // For form control, set the state for appropriate key/value on each change detected
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Upon submission of the form, create a newUser object, which has all info from this.state (except passwordConfirm, which would be redundant)
  handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {};
    for (const attr in this.state) {
      if (attr !== "password_confirm") newUser[attr] = this.state[attr];
    }

    // Call this function to add longitude and latitude based on the user's input zip (via geoAPI), then will subsequently update the user in the database. All this happens in App.js
    this.props.addLongAndLat(newUser);
  };

  render() {
    return (
      <Form
        user={this.state}
        handleSubmit={this.handleSubmit}
        handleInput={this.handleInput}
      ></Form>
    );
  }
}

export default withRouter(RegisterPage);
