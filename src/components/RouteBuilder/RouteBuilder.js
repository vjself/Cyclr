import React, { Component } from "react";
import Mapper from "../Mapper/Mapper";
import SaveRoute from "./SaveRoute/SaveRoute";
import Steps from "../Steps/Steps";
import "./routebuilder.css";
import axios from "axios";
import { withScriptjs } from "react-google-maps";
import { withRouter } from "react-router-dom";
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

  htmlr = str => {
    var regex = /\<(.*?)\>/g;
    let strSplit = str.replace(regex, "");
    return strSplit;
  };

  htmlr2 = str => {
    var regex = /\((.*?)\)/g;
    let strSplit = str.replace(regex, "");
    return strSplit;
  };

  render() {
    const { route } = this.state;
    var newStep =
      route.length &&
      route[0].legs[0].steps.map(e => {
        var first = this.htmlr(e.html_instructions);
        var second = this.htmlr2(first);
        return second;
      });
    console.log("NEWSTEP --> ", newStep);
    const steps =
      route.length &&
      route[0].legs[0].steps.map((e, i) => {
        return (
          <Steps
            distance={e.distance.text}
            duration={e.duration.text}
            instructions={newStep[i]}
          />
        );
      });
    console.log("STEPS --> ", steps);
    const saveSteps =
      route.length &&
      route[0].legs[0].steps.map((e, i) => {
        return {
          stepDistance: e.distance.text,
          stepDuration: e.duration.text,
          stepInstruc: newStep[i]
        };
      });
    const MapLoader = withScriptjs(Mapper);
    return (
      <div className="search-cont">
        {this.props.user[0] && (
          <li className="greeting">{`Welcome back ${
            this.props.user.first_name
          }!`}</li>
        )}
        {this.props.user.hasOwnProperty("id") ? (
          <div className="input-section">
            <label htmlFor="inp" className="inp">
              <input
                onChange={e =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                type="text"
                name="origin"
                placeholder="&nbsp;"
              />
              <span className="label">Origin...</span>
              <span className="border" />
            </label>
            <label htmlFor="inp" className="inp">
              <input
                onChange={e =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                type="text"
                name="destination"
                placeholder="&nbsp;"
              />
              <span className="label">Destination...</span>
              <span className="border" />
            </label>
            {!this.state.route.length > 0 && (
              <div className="submit-route">
                <button className="go-button" onClick={this.getDirections}>
                  Go
                </button>
              </div>
            )}
            {this.state.route.length > 0 && (
              <div ref={this.mapWindow} className="map-window">
                <div className="dist">
                  <span>Distance - {route[0].legs[0].distance.text}</span>
                  <br />
                  <span>Time - {route[0].legs[0].duration.text}</span>
                </div>
                <div className="inner-map-w">
                  <MapLoader
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                      process.env.REACT_APP_API_KEY
                    }`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    strtLat={route[0].legs[0].start_location.lat}
                    strtLng={route[0].legs[0].start_location.lng}
                    endLat={route[0].legs[0].end_location.lat}
                    endLng={route[0].legs[0].end_location.lng}
                  />

                  <div className="steps-box">
                    <h1 className="step-title">Step by Step</h1>
                    {steps}
                  </div>
                  <br />
                </div>
                <div className="save-route-box">
                  <SaveRoute
                    strtLat={route[0].legs[0].start_location.lat}
                    strtLng={route[0].legs[0].start_location.lng}
                    endLat={route[0].legs[0].end_location.lat}
                    endLng={route[0].legs[0].end_location.lng}
                    strtAdd={route[0].legs[0].start_address}
                    endAdd={route[0].legs[0].end_address}
                    newStep={saveSteps}
                    distance={route[0].legs[0].distance.text}
                    duration={route[0].legs[0].duration.text}
                    id={this.props.user.id}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          this.props.history.push("/login")
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(RouteBuilder)
);
