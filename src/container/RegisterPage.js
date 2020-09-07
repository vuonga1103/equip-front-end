import React from "react";
import "../styling/RegisterPage.css";
import { withRouter } from "react-router-dom";
import Form from "../component/Form";

class RegisterPage extends React.Component {
  state = {
    username: "",
    password: "",
    password_confirm: "",
    city: "",
    state: "",
    zip: "",
    email: "",
  };

  // For form control, set the state for appropriate key/value on each change detected
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Upon submission of the form, create a newUser object, which has all info from this.state (except password_confirm, which would be redundant), send the newUser object to backend via post request; backend will take care of creating a new user, giving that user a token, and returning a result in {user: {}, token: "..."} format
  handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {};
    for (const attr in this.state) {
      if (attr !== "password_confirm") newUser[attr] = this.state[attr];
    }

    this.addLongAndLat(newUser);
  };

  //function that takes in a newUser object without long and lat, use the newUser.zip to turn to lat and long, add it to the user, then call a fetch to send the newUser's data to backend
  addLongAndLat = (newUser) => {
    const zip = newUser.zip;
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${API_KEY}
    `;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        newUser.latitude = result.results[0].geometry.location.lat;
        newUser.longitude = result.results[0].geometry.location.lng;
        this.persistNewUser(newUser);
        return true;
      });
  };

  persistNewUser = (newUser) => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((result) => {
        // Once result comes back, we handle the result by setting this.state.user and this.state.token in App.js accordingly, as well as storing the token we got back in localStorage so as to avoid logging the user out with page refresh; after that we bring the user to /home

        if (this.props.handleResponse(result)) {
          this.props.history.push("/home");
        }
        return true;
      });
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
