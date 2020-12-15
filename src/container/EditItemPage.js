import React from "react";
import { withRouter } from "react-router-dom";
import ItemForm from "../component/ItemForm";
import { BACKEND_BASE_URL } from "../utils/constants";

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

    fetch(`${BACKEND_BASE_URL}/user-item/${id}`, {
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

    fetch(`${BACKEND_BASE_URL}/edit-item/${this.state.id}`, {
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
    return (
      <ItemForm
        item={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default withRouter(EditItemPage);
