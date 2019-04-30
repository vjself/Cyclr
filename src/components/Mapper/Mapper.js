/* global google */
import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

class Mapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null
    };
  }

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const { strtLat, strtLng, endLat, endLng } = this.props;

    const origin = { lat: strtLat, lng: strtLng };
    const destination = { lat: endLat, lng: endLng };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.BICYCLING
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

  render() {
    const { strtLat, strtLng } = this.props;
    const UserMap = withGoogleMap(() => (
      <GoogleMap
        defaultCenter={{ lat: strtLat, lng: strtLng }}
        defaultZoom={13}
      >
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div>
        <UserMap
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Mapper;
