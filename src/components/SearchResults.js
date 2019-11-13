import React from "react";
import HotelList from "./HotelList";
import { getCityId } from "../helper/mapCityId";

const APP_KEY = "f003334162e73dd3fc6ec1cfcb1bca67";
const API_BASE_URL = "https://developer.goibibo.com/api";
const APP_ID = "431e1109";
const SEARCH_URL = `${API_BASE_URL}/voyager/get_hotels_by_cityid/?app_id=${APP_ID}&app_key=${APP_KEY}&city_id=`;

class SearchResults extends React.Component {
  state = {
    results: [],
    faves: [],
    mode: "search",
    isLoading: false
  };

  handleFaveToggle = results => {
    results.isFave = !results.isFave;
    const faves = [...this.state.faves];
    const resultsIndex = faves.indexOf(results);
    if (resultsIndex === -1) {
      faves.push(results);
    } else {
      faves.splice(resultsIndex, 1);
    }
    this.setState({ faves });
    localStorage.setItem("faves", JSON.stringify(faves));
    const updatedResult = this.state.results;
    const UpdateResultIndex = updatedResult.indexOf(results);
    if (UpdateResultIndex !== -1) {
      updatedResult[UpdateResultIndex] = results;
      this.setState({
        results: updatedResult
      });
    }
  };

  getHotelResults = (query, faves) => {
    this.setState({
      isLoading: true,
      results: []
    });
    fetch(SEARCH_URL + getCityId(query))
      .then(response => response.json())
      .then(data => {
        const wrapData = Object.keys(data.data)
          .slice(0, 20)
          .map(key => {
            console.log(data.data[key].hotel_data_node.img_recommended);
            const isFave = !!(faves || []).filter(item => item.id === key)[0];
            return {
              id: key,
              name: data.data[key].hotel_data_node.name,
              rating: data.data[key].hotel_data_node.rating,
              thumb: data.data[key].hotel_data_node.img_recommended
                ? data.data[key].hotel_data_node.img_recommended.thumb.l
                : "https://static.thenounproject.com/png/340719-200.png",
              facilities: data.data[key].hotel_data_node.facilities
                ? data.data[key].hotel_data_node.facilities.mapped
                : "",
              location: data.data[key].hotel_data_node.loc.location
                ? data.data[key].hotel_data_node.loc.location
                : "",
              isFave
            };
          });
        return wrapData;
      })
      .then(data => this.setState({ results: data, isLoading: false }))
      .catch(err => {
        console.warn("error making API request:", err);
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    console.log("SearchResult is mounted!");
    const faves = JSON.parse(localStorage.getItem("faves")) || [];
    this.setState({
      faves
    });
    this.getHotelResults(this.props.match.params.query, faves);
  }

  componentDidUpdate(oldProps, oldState) {
    console.log("old:", oldProps.match.params.query);
    console.log("new:", this.props.match.params.query);

    if (oldProps.match.params.query !== this.props.match.params.query) {
      this.getHotelResults(this.props.match.params.query);
    }
  }

  handleSubmit = () => {
    const { mode } = this.state;
    this.setState({
      mode: mode === "search" ? "fav" : "search"
    });
  };

  render() {
    const { results, faves, mode, isLoading } = this.state;
    const modeSearch = mode === "search";
    const displayData = modeSearch ? results : faves;

    return (
      <div className="result-background">
        <button onClick={this.handleSubmit}>
          {modeSearch ? "FAVORITE" : "BACK TO SEARCH"}
        </button>
        <h3>Results for "{this.props.match.params.query}"</h3>
        <div className="results">
          {displayData.length ? (
            <div className="flex-2-column">
              {displayData.map((item, index) => (
                <HotelList
                  key={index}
                  id={item.id}
                  name={item.name}
                  photo={item.thumb}
                  rating={item.rating}
                  onFaveToggle={this.handleFaveToggle}
                  faves={faves}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <p>{isLoading ? "Loading results..." : "Data Not Found"}</p>
          )}
        </div>
      </div>
    );
  }
}

export default SearchResults;
