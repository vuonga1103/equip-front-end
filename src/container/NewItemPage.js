import React from "react";
import "../styling/NewItemPage.css";
import { withRouter } from "react-router-dom";
import BackButton from "../component/BackButton";

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

        this.loader = false;

        return true;
      });
  };

  render() {
    const {
      name,
      description,
      condition,
      price,
      pickup,
      shipping,
      category,
    } = this.state;

    return (
      <>
        {this.state.loader ? (
          <div id="submit-load-icon">
            <img
              src="https://media3.giphy.com/media/IeQy7gawYpcDaWs56l/giphy.gif"
              alt="loading icon"
            />
          </div>
        ) : null}

        <form
          className="ui form"
          id="new-item-form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h4 className="ui dividing header">Add Sale Item</h4>

          <div className="field">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              placeholder="Item's Name"
              required
              value={name}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
              value={description}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <label>Condition</label>
            <select
              className="ui fluid dropdown"
              name="condition"
              value={condition}
              onChange={this.handleChange}
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Worn">Worn</option>
            </select>
          </div>

          <div className="field">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price - Enter 0 If Donating Item"
              required
              value={price}
              onChange={this.handleChange}
            />
          </div>

          <div className="field" id="availability-field">
            <label>Item Available For</label>
            <div className="ui checkbox">
              <input
                type="checkbox"
                name="pickup"
                id="pickup"
                checked={pickup}
                onChange={this.handleChange}
              />
              <label htmlFor="pickup">Pick Up</label>
            </div>

            <div className="ui checkbox">
              <input
                type="checkbox"
                name="shipping"
                id="shipping"
                checked={shipping}
                onChange={this.handleChange}
              />
              <label htmlFor="shipping">Shipping</label>
            </div>
          </div>

          <div className="field">
            <label>Category</label>
            <select
              className="ui fluid dropdown"
              name="category"
              value={category}
              onChange={this.handleChange}
            >
              <option value="">Select Category</option>
              <option value="Wheelchairs & Scooters">
                Wheelchairs & Scooters
              </option>
              <option value="Walking Aids">Walking Aids</option>
              <option value="Beds & Lifts">Beds & Lifts</option>
              <option value="Bath & Shower">Bath & Shower</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="field">
            <label>Upload Image</label>
            <input
              type="file"
              name="photo"
              onChange={this.handleChange}
              required
            />
          </div>

          <input type="submit" value="Submit" className="ui submit button" />
        </form>
        <BackButton />
      </>
    );
  }
}

export default withRouter(NewItemPage);
