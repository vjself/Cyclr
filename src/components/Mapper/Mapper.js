/* global google */
import React, { Component } from "react";
import "./mapper.css";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  BicyclingLayer
} from "react-google-maps";

export default class Mapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: {},
      waypoints: []
    };
  }

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const { strtLat, strtLng, endLat, endLng } = this.props;
    const origin = { lat: strtLat, lng: strtLng };
    const destination = { lat: endLat, lng: endLng };
    const newDest = [{ location: destination, stopover: false }];
    const waypt = this.state.waypoints.length ? this.state.waypoints : newDest;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.BICYCLING,
        waypoints: waypt
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  addWaypoint = waypoint => {
    let lat = waypoint.latLng.lat();
    let lng = waypoint.latLng.lng();
    let waypt = this.state.waypoints.slice();
    waypt.push({ lat, lng });
    this.setState({ waypoints: waypt });
  };

  render() {
    console.log("G-maps -->>> ", google.maps);
    const { strtLat, strtLng } = this.props;
    const UserMap = withGoogleMap(() => (
      <GoogleMap defaultCenter={{ lat: strtLat, lng: strtLng }}>
        <BicyclingLayer autoupdate />
        <DirectionsRenderer
          clickable={true}
          directions={this.state.directions}
        />
      </GoogleMap>
    ));
    return (
      <div className="map-container">
        <UserMap
          containerElement={<div style={{ height: `400px`, width: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
