import React from "react";
import "../styling/App.css";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import NavBar from "../component/NavBar";
import Banner from "../component/Banner";
import ItemPage from "./ItemPage";
import AboutPage from "../component/AboutPage";
import HomePage from "../component/HomePage";
import ItemsPage from "./ItemsPage";
import LogInPage from "./LogInPage";
import RegisterPage from "./RegisterPage";
import EditPage from "./EditPage";
import SellerPage from "./SellerPage";
import NewItemPage from "./NewItemPage";
import NotFoundPage from "../component/NotFoundPage";
import ProtectedRoute from "../component/ProtectedRoute";

class App extends React.Component {
  state = {
    items: [],

    user: {
      id: "",
      username: "",
      city: "",
      state: "",
      zip: "",
      email: "",
    },

    token: "",
  };

  componentDidMount() {
    this.getItems();

    // If the user previously logged in, we want the user to stay logged in
    this.persistLoggedInUser();
  }

  // Get items that have already been filtered in the backend for only items that have not been sold (item.sold is false); set this.state.items array to the items that return
  getItems = () => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((items) => {
        this.setState({ items });
        return true;
      });
  };

  // If the user has previously logged in, make a request to /persist, sending the token stored in localStorage. Backend takes care of decoding the token, sends back result in the form of a { user: {}, token: "..."} object
  persistLoggedInUser = () => {
    if (localStorage.token) {
      fetch("http://localhost:4000/persist", {
        headers: {
          Authorization: `bearer ${localStorage.token}`,
        },
      })
        .then((response) => response.json())

        // Call this.handleResponse to handle: setting this.state.user to appropriate user, setting this.state.token to appropriate token, setting the localStorage.token to the token key we got back
        .then((result) => {
          this.handleResponse(result);
          return true;
        });
    }
  };

  // Handles the response of fetch to backend that sends back a result in the form of a { user: {}, token: "..."} object; if we get back an error object in the form of {error: ...}, then alert the user and return false, if not, set this.state.user to the user that we get back, and set this.state.token to the token we get back, then return true
  handleResponse = (result) => {
    if (result.error) {
      alert(result.error);
      return false;
    } else {
      this.setUser(result);
      localStorage.token = result.token;
      return true;
    }
  };

  // Takes in an object containing keys user and token, reset state accordingly
  setUser = ({ user, token }) => this.setState({ user, token });

  // Rid the localStorage of the token, reset this.state.user and this.state.token; bring the user to root page, and alert them that they have been logged out
  handleLogOut = () => {
    localStorage.removeItem("token");

    this.setState({
      user: {
        id: "",
        username: "",
        city: "",
        state: "",
        zip: "",
        email: "",
      },

      token: "",
    });

    this.props.history.push("/");
    alert("Log Out Successful!");
  };

  // Return an array of the current logged in user's items (items that they are selling)
  usersItems = () => {
    return this.state.items.filter((i) => i.user.id === this.state.user.id);
  };

  // Takes in an item object, if that object's sold is set to false, then set this.state.items to include that object; otherwise set this.state.items to not include that item
  addOrRemoveItem = (item) => {
    let items;
    if (!item.sold) {
      items = [...this.state.items, item];
    } else {
      items = this.state.items.filter((i) => i.id !== item.id);
    }
    this.setState({ items });
  };

  // takes in a sort criteria ("low-to-high", "high-to-low", or "location"), sort this.state.items, and set the state

  sortItems = (criteria) => {
    let items = [...this.state.items];

    switch (criteria) {
      case "low-to-high":
        items.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        items.sort((a, b) => b.price - a.price);
        break;
      case "location":
        items.sort((a, b) => a.user.distance - b.user.distance);
        break;
      default:
        items.sort((a, b) => a.id - b.id);
    }

    this.setState({ items });
    return items;
  };

  // function that gets the current user's coordinates
  getVisitorsLocation = () => {
    if (navigator.geolocation) {
      console.log("Inside getVisitorsLocation");
      return navigator.geolocation.getCurrentPosition(this.getLocation);
    } else {
      return "Geolocation is not supported by this browser.";
    }
  };

  getLocation = (position) => {
    const { latitude, longitude } = position.coords;

    this.setDistance(latitude, longitude);
  };

  // takes in visitor's latitude and longitude, and change state of items so that each item's user's distance is set to the distance between the user and the visitor
  setDistance(vLatitude, vLongitude) {
    const copyItems = JSON.parse(JSON.stringify(this.state.items));
    const items = copyItems.map((item) => {
      const sLatitude = item.user.latitude;
      const sLongitude = item.user.longitude;

      item.user.distance = this.distanceBetweenCoordinates(
        vLatitude,
        vLongitude,
        sLatitude,
        sLongitude
      );

      return item;
    });

    this.setState({ items });
  }

  distanceBetweenCoordinates = (lat1, lon1, lat2, lon2, unit) => {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return Math.round(dist);
    }
  };

  render() {
    this.getVisitorsLocation();
    // If localStorage has key "token" that points to something that is not an empty string, then we are logged in
    const loggedIn = localStorage.getItem("token");

    return (
      <div className="App">
        <NavBar loggedIn={loggedIn} handleLogOut={this.handleLogOut} />
        <Banner loggedIn={loggedIn} />

        <Switch>
          <Route path="/item-page/:id" exact component={ItemPage} />

          <Route path="/about" exact component={AboutPage} />

          <Route path="/login" exact>
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <LogInPage
                setUser={this.setUser}
                handleResponse={this.handleResponse}
              />
            )}
          </Route>

          <Route path="/register" exact>
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <RegisterPage handleResponse={this.handleResponse} />
            )}
          </Route>

          <ProtectedRoute exact path="/edit" component={EditPage} />

          <ProtectedRoute
            exact
            path="/home"
            user={this.state.user}
            component={HomePage}
          />

          <ProtectedRoute
            exact
            path="/seller"
            user={this.state.user}
            component={SellerPage}
            addOrRemoveItem={this.addOrRemoveItem}
          />

          <ProtectedRoute
            exact
            path="/new-item"
            addOrRemoveItem={this.addOrRemoveItem}
            getVisitorsLocation={this.getVisitorsLocation}
            component={NewItemPage}
          />

          <Route path="/not-found" exact component={NotFoundPage} />

          <Route path="/" exact>
            <ItemsPage items={this.state.items} sortItems={this.sortItems} />
          </Route>

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
