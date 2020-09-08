import React from "react";
import "../styling/EditPasswordPage.css";
import { withRouter } from "react-router-dom";
import BackButton from "../component/BackButton";

class EditPasswordPage extends React.Component {
  state = {
    currentPassword: "",
    password: "",
    passwordConfirm: "",
    currentPasswordError: "",
    currentPasswordCorrect: false,
    passwordConfirmValid: true,
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateCurrentPassword = (e) => {
    fetch("http://localhost:4000/validate-current-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.token}`,
      },
      body: JSON.stringify({ password: this.state.currentPassword }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          this.setState({
            currentPasswordError: result.error,
            currentPasswordCorrect: false,
          });
        } else {
          this.setState({
            currentPasswordError: "",
            currentPasswordCorrect: true,
          });
        }
      });
  };

  validatePasswordConfirm = (e) => {
    return this.state.password === e.target.value
      ? this.setState({ passwordConfirmValid: true })
      : this.setState({ passwordConfirmValid: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      password,
      currentPasswordCorrect,
      passwordConfirmValid,
    } = this.state;

    if (!currentPasswordCorrect || !passwordConfirmValid) {
      let errorPopup = "";
      errorPopup += currentPasswordCorrect ? "" : "Invalid current password\n";
      errorPopup += passwordConfirmValid ? "" : "Passwords do not match";
      alert(errorPopup);
    } else {
      fetch("http://localhost:4000/change-password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.token}`,
        },
        body: JSON.stringify({ password }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            this.props.history.push("/home");
            alert("Your password has been changed!");
          } else {
            alert(result.error);
          }
        });
    }
  };

  render() {
    const { currentPassword, password, passwordConfirm } = this.state;
    return (
      <form
        className="ui form"
        id="register-or-edit-form"
        onChange={this.handleInput}
        onSubmit={this.handleSubmit}
      >
        <h4 className="ui dividing header">Reset Password</h4>

        <div className="field">
          <label>Current Password</label>
          <div id="password-error">{this.state.currentPasswordError}</div>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={currentPassword}
            onBlur={this.validateCurrentPassword}
            required
          />
        </div>
        <div className="field">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={password}
            required
          />
        </div>
        <div className="field">
          <label>Confirm New Password</label>
          <div id="password-error">
            {!this.state.passwordConfirmValid
              ? "Passwords do not match!"
              : null}
          </div>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm New Password"
            value={passwordConfirm}
            onChange={this.validatePasswordConfirm}
            required
          />
        </div>
        <input type="Submit" value="Submit" className="ui submit button" />
        <br />
        <br />
        <BackButton />
      </form>
    );
  }
}

export default withRouter(EditPasswordPage);
