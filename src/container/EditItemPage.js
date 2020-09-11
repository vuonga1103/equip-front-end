import React from "react";
import { withRouter } from "react-router-dom";
import BackButton from "../component/BackButton";

class EditItemPage extends React.Component {
  state = {
    id: "",
    name: "",
    description: "",
    condition: "",
    price: "",
    pickup: "",
    shipping: "",
    category: "",
    photo: "",

    loader: false,
  };

  componentDidMount() {
    this.getItem();
  }

  getItem = () => {
    const id = this.props.computedMatch.params.id;

    fetch("http://localhost:4000/user-item/" + id, {
      headers: {
        Authorization: `bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          const {
            id,
            name,
            description,
            condition,
            price,
            pickup,
            shipping,
            category,
            photo,
          } = result;

          this.setState({
            id,
            name,
            description,
            condition,
            price,
            pickup,
            shipping,
            category,
            photo,
          });
        } else {
          this.props.history.push("/not-found");
        }
        return true;
      });
  };

  handleChange = (e) => {
    const { name, type, files, checked, value } = e.target;

    if (name === "photo") {
      this.setState({ [name]: files[0] });
      console.log(typeof files[0]);
    } else if (type === "checkbox") {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ loader: true });

    const formData = new FormData();

    for (const key in this.state) {
      formData.append(key, this.state[key]);
    }

    fetch("http://localhost:4000/edit-item/" + this.state.id, {
      method: "POST",
      headers: { Authorization: `bearer ${localStorage.token}` },
      // Here we are setting the formData instead of the typical JSON
      body: formData,
    })
      .then((response) => response.json())
      .then((item) => {
        console.log(item);
        const { updateItem, history, getVisitorsLocation } = this.props;
        // Add the new item to the root page
        updateItem(item);
        // Bring user to the new item's pg
        history.push(`/item-page/${item.id}`);
        // Involved with this function is the setting of the distance (between the seller and the current viewer of page-- aka to have the "x mi away" part to display under the new item's image in the root page)
        getVisitorsLocation();
        // this.loader = false;
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
      photo,
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
          onSubmit={this.handleSubmit}
        >
          <h4 className="ui dividing header">Edit Sale Item</h4>

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
            <label>Upload New Image</label>
            <input type="file" name="photo" onChange={this.handleChange} />
          </div>

          <input type="submit" value="Submit" className="ui submit button" />
        </form>
        <BackButton />
      </>
    );
  }
}

export default withRouter(EditItemPage);
