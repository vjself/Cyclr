/* global google */
import React, { Component } from "react";
import "./mapper.css";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  BicyclingLayer
  // DrawingManager
} from "react-google-maps";

export default class Mapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: {},
      isMarkerShown: false,
      markerPositions: [],
      selectedMarker: [],
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

  addMarker = e => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    let markers = this.state.markerPositions.slice();
    markers.push({ lat, lng });
    this.setState({
      markerPositions: markers,
      isMarkerShown: !this.state.isMarkerShown
    });
  };

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
      <GoogleMap
        defaultCenter={{ lat: strtLat, lng: strtLng }}
        onClick={e => this.addMarker(e)}
      >
        <BicyclingLayer autoupdate />
        <DirectionsRenderer
          clickable={true}
          directions={this.state.directions}
        />
        {this.state.isMarkerShown &&
          this.state.markerPositions.map(marker => {
            return (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                draggable={true}
              >
                <div>{this.state.selectedMarker}</div>}
              </Marker>
            );
          })}
        {/* <DrawingManager
          defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.POLYLINE,
                google.maps.drawing.OverlayType.RECTANGLE
              ]
            },
            circleOptions: {
              fillColor: `#ffff00`,
              fillOpacity: 1,
              strokeWeight: 5,
              clickable: false,
              editable: true,
              zIndex: 1
            }
          }}
        /> */}
      </GoogleMap>
    ));
    return (
      <div className="map-container">
        <UserMap
          containerElement={<div style={{ height: `500px`, width: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
