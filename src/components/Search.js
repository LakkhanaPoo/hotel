import React from "react";

class Search extends React.Component {
  state = {
    searchText: ""
  };
  handleChange = e => {
    this.setState({ searchText: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("Form was submited");
    this.props.history.push(`/search/${this.state.searchText}`);
  };

  render() {
    return (
      <div className="search-bg">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder={"Search Hotel By City"}
          />
          <button onClick={this.handleSubmit}>SEARCH</button>
        </form>
      </div>
    );
  }
}

export default Search;
