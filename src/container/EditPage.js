import React from "react";
import RegisterEditForm from "../component/RegisterEditForm";
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
        <RegisterEditForm
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
