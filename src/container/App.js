import React from "react";
import "../App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "../component/NavBar";
import Banner from "../component/Banner";
import ItemPage from "../component/ItemPage";
import NotFoundPage from "../component/NotFoundPage";

class App extends React.Component {
  state = {
    items: [],
  };

  showItemPage = (routerProps) => {
    const itemID = routerProps.match.params.id;
    const foundItem = this.state.items.find((item) => {
      return item.id === itemID;
    });

    if (foundItem) {
      return <ItemPage item={foundItem} />;
    } else {
      return <NotFoundPage />;
    }
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <Banner />

        {/* Switch ensures that only one component shows with one route at a time */}
        <Switch>
          <Route path="/item-page/:id" render={this.showItemPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
