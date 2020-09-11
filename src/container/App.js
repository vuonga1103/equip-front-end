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
import EditPasswordPage from "./EditPasswordPage";
import SellerPage from "./SellerPage";
import NewItemPage from "./NewItemPage";
import NotFoundPage from "../component/NotFoundPage";
import ProtectedRoute from "../component/ProtectedRoute";

class App extends React.Component {
  state = {
    // All unsold items in [{..., user: {...}}, {..., user: {...}}, ...] format
    items: [],

    // Current logged in user
    user: {
      id: "",
      username: "",
      city: "",
      state: "",
      zip: "",
      email: "",
    },

    // Current logged in user's token
    token: "",

    // For infinite scroll
  };

  componentDidMount() {
    // Make fetch to get items not sold
    this.getItems();

    // If the user previously logged in, they should stay logged in
    this.persistLoggedInUser();
  }

  // Get items that have already been filtered in the backend for only items that have not been sold (item.sold is false); set this.state.items array to the items that return
  getItems = () => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((items) => {
        this.setState({ items }, () => this.getVisitorsLocation());
        return true;
      });
  };

  // *****************************************************************************
  // ************ FX'S THAT HANDLE USER PERSIST, LOG-IN, LOG-OUT *****************
  // *****************************************************************************
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

  // Takes in an object containing keys user and token, set this.state accordinly
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

  // Takes in a user object initially without longitude and latitude added, use the user's zip to make an API request to geocode, get back the longitude and latitude, assign them to the user, then depending on whether the user is registering or is just editing their account, to call either persistNewUser() or updateUser()
  addLongAndLat = (user) => {
    const zip = user.zip;
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${API_KEY}
    `;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        user.latitude = result.results[0].geometry.location.lat;
        user.longitude = result.results[0].geometry.location.lng;

        const pathname = this.props.location.pathname;

        if (pathname === "/register") {
          this.persistNewUser(user);
        } else if (pathname === "/edit") {
          this.updateUser(user);
        }
        return true;
      });
  };

  // Persist the new user to the database and then take user home
  persistNewUser = (newUser) => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((result) => {
        if (this.handleResponse(result)) {
          this.props.history.push("/home");
        }
        return true;
      });
  };

  // Update the user in the database, then take user home
  updateUser = (user) => {
    fetch("http://localhost:4000/users/" + user.id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        this.handleResponse(result);
        this.props.history.push("/home");
        this.getVisitorsLocation();

        alert("Account successfully updated!");
        return true;
      });
  };

  // *****************************************************************************
  // ******************* RE-SETTING this.state.items FUNCTIONS *******************
  // *****************************************************************************

  // Returns an array of the current logged in user's items (items that they are selling)
  usersItems = () =>
    this.state.items.filter((i) => i.user.id === this.state.user.id);

  // Takes in an item object, accordingly to whether the object's "sold" attribute is set to false or true, to set this.state.items to include or exclude that item (i.e. if the seller marks the item as sold, we don't want to display it in root page)
  addOrRemoveItem = (item) => {
    const items = item.sold
      ? this.state.items.filter((i) => i.id !== item.id)
      : [...this.state.items, item];

    this.setState({ items });
  };

  // Takes in a sort criteria ("low-to-high", "high-to-low", or "location"), sort this.state.items accordingly
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

  // *****************************************************************************
  // *************************** GEOLOCATION FUNCTIONS ***************************
  // *****************************************************************************

  // Is called with render(), if the visitor enables geolocation, then call .getCurrentPosition() with callback getLocation()
  getVisitorsLocation = () => {
    console.log("inside visitor's location");
    return navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(this.getLocation)
      : "Geolocation is not supported by this browser.";
  };

  // getLocation() has access to position, from which latitude and longitude could be obtained; using these values, we can add an attribute called distance to the state of each of the user in this.state.users array; this is going to be set to the distance between the current visitor and the seller of each item
  getLocation = (position) => {
    console.log("Location gotten");
    const { latitude, longitude } = position.coords;
    this.setDistance(latitude, longitude);
  };

  // Takes in current visitor's latitude and longitude obtained from built in navigator.geolocation and change state of items so that each item's user's distance is set to the distance between the user and the visitor
  setDistance(vLatitude, vLongitude) {
    // Make a deep copy of this.state.items to avoid mutating anything
    const copyItems = JSON.parse(JSON.stringify(this.state.items));

    // Map through the copy of items
    const items = copyItems.map((item) => {
      // Seller's latitude and longitude can be obtained directly from each item's user object
      const sLatitude = item.user.latitude;
      const sLongitude = item.user.longitude;

      // Call .distanceBetweenCoordinates(), which takes in the visitor's lat and lng coords and the seller's lat and lng coords and returns the distance in miles; then create a new key in item.user called distance and assigning it the result
      item.user.distance = this.distanceBetweenCoordinates(
        vLatitude,
        vLongitude,
        sLatitude,
        sLongitude
      );

      return item;
    });

    // Set this.state.items; now each item's user will have a key of 'distance' pointing to the distance between the seller of that object and the current visitor
    this.setState({ items });
  }

  // Function to calculate distance between two coordinates, obtained from https://www.geodatasource.com/developers/javascript; this is to avoid making another API request
  distanceBetweenCoordinates = (lat1, lon1, lat2, lon2, unit) => {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
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

  // *****************************************************************************
  // *****************************************************************************

  render() {
    // If localStorage has key "token" that points to something that is not an empty string, then we are logged in; loggedIn var is used to determine where we should direct user if they visit /login and /register
    const loggedIn = localStorage.getItem("token");

    return (
      <div className="App">
        <NavBar
          loggedIn={loggedIn}
          handleLogOut={this.handleLogOut}
          username={this.state.user.username}
        />
        <Banner loggedIn={loggedIn} />

        <Switch>
          <Route path="/item-page/:id" exact component={ItemPage} />

          <Route path="/about" exact component={AboutPage} />

          {/* If user is already logged in, then should be redirected to root page when they try to go to /login, if not, let they go to /login */}
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
              <RegisterPage addLongAndLat={this.addLongAndLat} />
            )}
          </Route>

          {/*********************************************************/}
          {/***** These routes require the user to be logged in *****/}
          {/*********************************************************/}
          <ProtectedRoute
            exact
            path="/edit"
            user={this.state.user}
            addLongAndLat={this.addLongAndLat}
            component={EditPage}
          />

          <ProtectedRoute
            exact
            path="/edit-password"
            user={this.state.user}
            // addLongAndLat={this.addLongAndLat}
            component={EditPasswordPage}
          />

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
          {/*********************************************************/}
          {/*********************************************************/}

          <Route path="/not-found" exact component={NotFoundPage} />

          <Route path="/" exact>
            <ItemsPage items={this.state.items} sortItems={this.sortItems} />
          </Route>

          {/* Catch-all for if none of the routes above matches */}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
