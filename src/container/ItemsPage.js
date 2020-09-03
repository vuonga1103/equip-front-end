import React from "react";
import Item from "../component/Item";
import "../styling/ItemsPage.css";

class ItemsPage extends React.Component {
  // has access to this.props.items
  renderItems = () => {
    return this.props.items.map((i) => {
      return <Item key={i.id} item={i} />;
    });
  };

  render() {
    return (
      <div className="ui grid container">
        <div className="four wide column">
          hello from first column hello from first column hello from first
          column hello from first column hello from first column hello from
          first column hello from first column hello from first column hello
          from first column hello from first column
        </div>
        <div className="twelve wide column">
          <div className="ui three column grid">{this.renderItems()}</div>
        </div>
      </div>
    );
  }
}

export default ItemsPage;
