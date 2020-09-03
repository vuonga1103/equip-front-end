import React from "react";
import "../styling/App.css";
import { Route, Switch } from "react-router-dom";
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
  };

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((items) => {
        this.allItems = items;
        this.setState({ items });
      });
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <Banner />

        {/* Switch ensures that the first route that matches will show*/}
        {/* Add more specific routes first /listings/new before /listings/:id for example */}
        <Switch>
          <Route path="/item-page/:id" exact component={ItemPage} />

          <Route path="/about" exact component={AboutPage} />

          <Route path="/login" exact component={LogInPage} />

          <Route path="/register" exact component={RegisterPage} />

          <Route path="/edit" exact component={EditPage} />

          <Route path="/home" exact component={HomePage} />

          <Route path="/seller" exact component={SellerPage} />

          <Route path="/new-item" exact component={NewItemPage} />

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

export default App;
