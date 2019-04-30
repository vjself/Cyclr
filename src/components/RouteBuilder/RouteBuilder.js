import React, { Component } from "react";
import Mapper from "../Mapper/Mapper";
import SaveRoute from "./SaveRoute/SaveRoute";
import "./routebuilder.css";
import axios from "axios";
import { withScriptjs } from "react-google-maps";
import { connect } from "react-redux";

class RouteBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: "",
      destination: "",
      route: []
    };
  }

  changeHandler = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  getDirections = (origin, dest) => {
    origin = this.state.origin;
    dest = this.state.destination;
    axios.post("/api/route", { origin, dest }).then(res => {
      this.setState({
        route: res.data.routes,
        origin: "",
        destination: ""
      });
    });
  };

  render() {
    const { route } = this.state;
    const MapLoader = withScriptjs(Mapper);
    return (
      <div className="search-cont">
        <div className="input-section">
          <input
            value={this.state.origin}
            type="text"
            name="origin"
            placeholder="Origin..."
            onChange={e => this.changeHandler(e.target.name, e.target.value)}
          />
          <input
            value={this.state.destination}
            type="text"
            name="destination"
            placeholder="Destination..."
            onChange={e => this.changeHandler(e.target.name, e.target.value)}
          />
          {!this.state.route.length > 0 ? (
            <div className="submit-route">
              <button className="go-button" onClick={this.getDirections}>
                Go
              </button>
            </div>
          ) : null}
          {this.state.route.length > 0 ? (
            <div className="map-window">
              <span>{route[0].legs[0].distance.text}</span>
              <br />
              <span>{route[0].legs[0].duration.text}</span>
              <MapLoader
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4wE1BZ3pvfpuuJb3fZYiviaJstHopkis"
                loadingElement={<div style={{ height: `100%` }} />}
                strtLat={route[0].legs[0].start_location.lat}
                strtLng={route[0].legs[0].start_location.lng}
                endLat={route[0].legs[0].end_location.lat}
                endLng={route[0].legs[0].end_location.lng}
              />
              <SaveRoute
                strtLat={route[0].legs[0].start_location.lat}
                strtLng={route[0].legs[0].start_location.lng}
                endLat={route[0].legs[0].end_location.lat}
                endLng={route[0].legs[0].end_location.lng}
                strtAdd={route[0].legs[0].start_address}
                endAdd={route[0].legs[0].end_address}
                strt
                id={this.props.user.id}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user
  };
};

export default connect(
  mapStateToProps,
  null
)(RouteBuilder);
