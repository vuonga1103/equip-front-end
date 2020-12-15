import React from "react";
import "../styling/ItemForm.css";
import BackButton from "../component/BackButton";
import { useLocation } from "react-router-dom";

const ItemForm = (props) => {
  const {
    item: {
      name,
      description,
      condition,
      price,
      pickup,
      shipping,
      category,
      loader,
    },
    handleChange,
    handleSubmit,
  } = props;

  const location = useLocation();

  return (
    <>
      {loader ? (
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
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <h4 className="ui dividing header">
          {location.pathname === "/new-item"
            ? "Add Sale Item"
            : "Edit Sale Item"}
        </h4>

        <div className="field">
          <label>Item Name</label>
          <input
            type="text"
            name="name"
            placeholder="Item's Name"
            required
            value={name}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Condition</label>
          <select
            className="ui fluid dropdown"
            name="condition"
            value={condition}
            onChange={handleChange}
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
            onChange={handleChange}
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
              onChange={handleChange}
            />
            <label htmlFor="pickup">Pick Up</label>
          </div>

          <div className="ui checkbox">
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={handleChange}
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
            onChange={handleChange}
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
          <label>
            {location.pathname === "/new-item"
              ? "Upload Image"
              : "Upload New Image"}
          </label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            required={location.pathname === "/new-item"}
          />
        </div>

        <input type="submit" value="Submit" className="ui submit button" />
      </form>
      <BackButton />
    </>
  );
};

export default ItemForm;
