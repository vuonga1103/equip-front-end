import React from "react";
import "../styling/NewItemPage.css";
import { withRouter } from "react-router-dom";

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
  };

  handleChange = (e) => {
    e.persist();
    const { name, type } = e.target;

    if (name === "photo") {
      this.setState({ [name]: e.target.files[0] });
    } else if (type === "checkbox") {
      this.setState({ [name]: e.target.checked });
    } else {
      this.setState({ [name]: e.target.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in this.state) {
      formData.append(key, this.state[key]);
    }

    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: { Authorization: `bearer ${localStorage.token}` },
      body: formData,
    })
      .then((response) => response.json())
      .then((item) => {
        this.props.addOrRemoveItem(item);
        this.props.history.push(`/item-page/${item.id}`);
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
      <form
        className="ui form"
        id="new-item-form"
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      >
        <h4 className="ui dividing header">Add Item</h4>

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
          <label>Price (USD)</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
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
    );
  }
}

export default withRouter(NewItemPage);
