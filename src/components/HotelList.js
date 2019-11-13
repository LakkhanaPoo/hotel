import React, { Component } from "react";
import Fave from "./Fave";

class HotelList extends Component {
  state = {
    searchText: {},
    id: this.props.id
  };

  handleSeeMore = e => {
    e.preventDefault();
    console.log("See More");
    this.props.history.push(`/detail/${this.props.id}`);
  };
  render() {
    const { id, name, photo, rating } = this.props;
    console.log("id", id);
    return (
      <div className="card">
        <div className="flex-container">
          <img src={photo} alt={photo} className="thumb" />
          <p className="title-name">
            {name}
            <span>
              <p className="rating">
                <strong>Rating:</strong> {rating}/5
              </p>
            </span>
          </p>
          <a href={`/detail/${id}`}>
            <button className="see-more">SEE MORE</button>
          </a>
          <Fave
            id={id}
            isFave={this.props.isFave}
            onFaveToggle={this.props.onFaveToggle}
            item={this.props.item}
          />
        </div>
      </div>
    );
  }
}

export default HotelList;
