import React from "react";
import "../styling/EditPage.css";
import Form from "../component/Form";
import { withRouter } from "react-router-dom";
import BackButton from "../component/BackButton";

class EditPage extends React.Component {
  state = {
    id: "",
    username: "",
    city: "",
    state: "",
    zip: "",
    email: "",
  };

  componentDidMount() {
    const { id, username, city, state, zip, email } = this.props.user;
    this.setState({ id, username, city, state, zip, email });
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = this.state;

    // Will add longitude and latitude based on user's input zip (via geocode API), then will subsequently update the user in the database. All this happens in App.js
    this.props.addLongAndLat(user);
  };

  render() {
    return (
      <>
        <Form
          user={this.state}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />
        <BackButton />
      </>
    );
  }
}

export default withRouter(EditPage);
