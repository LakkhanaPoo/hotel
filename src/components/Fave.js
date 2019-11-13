import React, { Component } from "react";

class Fave extends Component {
  handleClick = e => {
    e.stopPropagation();
    console.log("Handling Fave click!");
    this.props.onFaveToggle(this.props.item);
  };

  render() {
    const { item } = this.props;
    const isActive = item.isFave ? "isActive" : "";

    return (
      <p className={`material-icons ${isActive}`} onClick={this.handleClick}>
        {item.isFave ? "remove_from_queue" : "add_to_queue"}
      </p>
    );
  }
}

export default Fave;
