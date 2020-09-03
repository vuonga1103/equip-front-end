import React from "react";
import "../styling/App.css";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import NavBar from "../component/NavBar";
import Banner from "../component/Banner";
import ItemPage from "../component/ItemPage";
import AboutPage from "../component/AboutPage";
import HomePage from "../component/HomePage";
import ItemsPage from "./ItemsPage";
import LogInPage from "./LogInPage";
import RegisterPage from "./RegisterPage";
import EditPage from "./EditPage";
import SellerPage from "./SellerPage";
import NewItemPage from "./NewItemPage";
import NotFoundPage from "../component/NotFoundPage";

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

    if (localStorage.token) {
      fetch("http://localhost:4000/persist", {
        headers: {
          Authorization: `bearer ${localStorage.token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => this.handleResponse(result));
    }
  }

  getItems = () => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((items) => {
        this.allItems = items;
        this.setState({ items });
      });
  };

  handleResponse = (result) => {
    if (result.error) {
      alert(result.error);
    } else {
      this.setUser(result);
      localStorage.token = result.token;
      this.props.history.push("/home");
    }
  };

  // takes in a nested hash containing keys user and token, reset state accordingly
  setUser = ({ user, token }) => {
    this.setState({ user, token });
    this.loggedIn = this.state.token;
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <Banner />

        <Switch>
          <Route path="/item-page/:id" exact component={ItemPage} />

          <Route path="/about" exact component={AboutPage} />

          <Route path="/login" exact>
            {this.loggedIn ? (
              <Redirect to="/" />
            ) : (
              <LogInPage
                setUser={this.setUser}
                handleResponse={this.handleResponse}
              />
            )}
          </Route>

          <Route path="/register" exact>
            {this.loggedIn ? <Redirect to="/" /> : <RegisterPage />}
          </Route>

          <Route path="/edit" exact>
            {!this.loggedIn ? <Redirect to="/" /> : <EditPage />}
          </Route>

          <Route path="/home" exact>
            {!this.loggedIn ? <Redirect to="/" /> : <HomePage />}
          </Route>

          <Route path="/seller" exact>
            {!this.loggedIn ? <Redirect to="/" /> : <SellerPage />}
          </Route>

          <Route path="/new-item" exact>
            {!this.loggedIn ? <Redirect to="/" /> : <NewItemPage />}
          </Route>

          <Route path="/not-found" exact component={NotFoundPage} />

          <Route path="/" exact>
            <ItemsPage items={this.state.items} />
          </Route>

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
