import React from "react";
import { withRouter } from "react-router-dom";
import ItemForm from "../component/ItemForm";

class NewItemPage extends React.Component {
  state = {
    name: "",
    description: "",
    condition: "",
    price: "",
    pickup: false,
    shipping: false,
    category: "",
    photo: "",

    loader: false,
  };

  // Handle user's inputs of new item's information
  handleChange = (e) => {
    console.log("inside new item handle change");
    const { name, type, files, checked, value } = e.target;

    if (name === "photo") {
      this.setState({ [name]: files[0] });
    } else if (type === "checkbox") {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
  };

  // Make a post request to backend, sending token. Backend will take care of decoding token to get the authorized user, make the new item and persist it to the database
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ loader: true });

    // Creation of a new formData, which is a format we can use to send the info, including the image of the item the user uploaded
    const formData = new FormData();

    // Looping through each key-value pair in this.state, each representing a piece of the item's info, and appending the key-value pair to the formData to be sent
    for (const key in this.state) {
      formData.append(key, this.state[key]);
    }

    //MAKE LOADING ICON POP UP

    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: { Authorization: `bearer ${localStorage.token}` },
      // Here we are setting the formData instead of the typical JSON
      body: formData,
    })
      .then((response) => response.json())
      .then((item) => {
        const { addOrRemoveItem, history, getVisitorsLocation } = this.props;

        // Add the new item to the root page
        addOrRemoveItem(item);

        // Bring user to the new item's pg
        history.push(`/item-page/${item.id}`);

        // Involved with this function is the setting of the distance (between the seller and the current viewer of page-- aka to have the "x mi away" part to display under the new item's image in the root page)
        getVisitorsLocation();

        return true;
      });
  };

  render() {
    return (
      <ItemForm
        item={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default withRouter(NewItemPage);
