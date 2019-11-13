import React, { Component } from "react";
import Facility from "./Facility";

const APP_KEY = "f003334162e73dd3fc6ec1cfcb1bca67";
const API_BASE_URL = "https://developer.goibibo.com/api";
const APP_ID = "431e1109";

const getUrl = id =>
  `${API_BASE_URL}/voyager/?app_id=${APP_ID}&app_key=${APP_KEY}&&method=hotels.get_hotels_data&id_list=%5B${id}%5D&id_type=_id`;

class Detail extends Component {
  state = {
    results: {}
  };

  componentDidMount() {
    const path = window.location.pathname.split("/");
    this.getDetail(path[path.length - 1]);
  }

  getDetail = id => {
    fetch(getUrl(id))
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data;
      })
      .then(data => ({
        id,
        name: data.data[id].hotel_data_node.name,
        rating: data.data[id].hotel_data_node.rating,
        thumb: data.data[id].hotel_data_node.img_recommended
          ? data.data[id].hotel_data_node.img_recommended.fs.l
          : "https://static.thenounproject.com/png/340719-200.png",
        facilities: data.data[id].hotel_data_node.facilities
          ? data.data[id].hotel_data_node.facilities.mapped
          : "",
        location: data.data[id].hotel_data_node.loc.location
          ? data.data[id].hotel_data_node.loc.location
          : "",
        img: data.data[id].hotel_data_node.img
          ? data.data[id].hotel_data_node.img
          : "",
        desc: data.data[id].hotel_data_node.desc.default,
        email: data.data[id].hotel_data_node.contact.email,
        phone: data.data[id].hotel_data_node.contact.phone,
        web: data.data[id].hotel_data_node.contact.web
      }))
      .then(data => this.setState({ results: data }))
      .catch(err => console.warn("error making API request:", err));
  };

  render() {
    const { results } = this.state;
    console.log("results", results);

    return (
      <div>
        <div className="card-detail">
          <div className="flex-2-column-detail">
            <div>
              <img src={this.state.results.thumb} className="detail-thumb" />
            </div>
            <div className="detail">
              <p className="title-name detail">
                <p>{this.state.results.name}</p>
                <span className="rating">
                  <p>
                    <strong>Rating: </strong>
                    {this.state.results.rating}/5
                  </p>
                </span>
              </p>
              <div className="flex-2-column">
                <div>
                  <p className="facility">
                    <strong>Facilities: </strong>
                  </p>
                  {this.state.results.facilities
                    ? this.state.results.facilities.map((item, index) => (
                        <Facility facility={item} key={index} />
                      ))
                    : "-"}
                  <p className="facility">
                    <strong>Location: </strong>
                    {this.state.results.location
                      ? this.state.results.location
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="facility">
                    <strong>Contact: </strong>
                    <p>
                      <i>Web: </i>
                      <a href={this.state.results.web} target="_blank">
                        {this.state.results.web ? this.state.results.web : "-"}
                      </a>
                    </p>
                    <p>
                      <i>Email: </i>
                      {this.state.results.email
                        ? this.state.results.email
                        : "-"}
                    </p>
                    <p>
                      <i>Tel No: </i>
                      {this.state.results.phone
                        ? this.state.results.phone.map((item, index) => (
                            <p key={index}>
                              <li>{item}</li>{" "}
                            </p>
                          ))
                        : "-"}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.results.img ? (
          <div className="card-detail">
            <p>
              <strong>All Gallery</strong>
            </p>
            <hr width="100%" />
            <div className="flex-4-column">
              {this.state.results.img
                ? this.state.results.img.map((item, index) => (
                    <img key={index} src={item.l} className="img-l" />
                  ))
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.results.desc ? (
          <div className="card-detail">
            <p>
              <strong>Description</strong>
            </p>
            <hr width="100%" />
            <p className="desc">{this.state.results.desc}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Detail;
