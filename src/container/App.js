import React from "react";
import "../App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "../component/NavBar";
import Banner from "../component/Banner";
import ItemPage from "../component/ItemPage";
import ItemsPage from "./ItemsPage";
import NotFoundPage from "../component/NotFoundPage";

class App extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.getItems();
  }

  showItemPage = (routerProps) => {
    const itemID = parseInt(routerProps.match.params.id);

    const foundItem = this.state.items.find((item) => item.id === itemID);

    if (foundItem) return <ItemPage item={foundItem} />;

    return <NotFoundPage />;
  };

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

        {/* Switch ensures that only one component shows with one route at a time */}
        <Switch>
          <Route path="/item-page/:id" render={this.showItemPage} />

          <Route path="/">
            <ItemsPage items={this.state.items} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
