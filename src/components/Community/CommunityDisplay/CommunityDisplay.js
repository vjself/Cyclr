import React, { Component } from "react";
import Mapper from "../../Mapper/Mapper";
import { withScriptjs } from "react-google-maps";
import Steps from "../../Steps/Steps";
import ".././comm.css";

export default class CommunityDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false
    };
  }

  showMap = () => {
    this.setState({
      showMap: !this.state.showMap
    });
  };

  render() {
    let instruc = this.props.instructions;
    let instruc2 = instruc.map(e => {
      return JSON.parse(e);
    });
    let userStepInfo = instruc2.map(e => {
      return (
        <Steps
          instructions={e.stepInstruc}
          distance={e.stepDistance}
          duration={e.stepDuration}
        />
      );
    });
    const MapLoader = withScriptjs(Mapper);
    return (
      <div className="comm-container">
        <div className="comm-submitted">
          <div className="comm-addy">
            <div id="comm-addy-in" onClick={() => this.showMap()}>
              {`${this.props.strtAdd} to ${this.props.endAdd}`}
            </div>
            <div>
              Submitted by - <i>{this.props.username}</i>
            </div>
            <div>
              <div className="comm-about">About</div>
              <div className="comm-desc">
                {this.props.description && this.props.description}
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="comm-map-cont">
          {this.state.showMap === true && (
            <div className="comm-map">
              <MapLoader
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                  process.env.REACT_APP_API_KEY
                }`}
                loadingElement={<div style={{ height: `100%` }} />}
                strtLat={this.props.strtLat}
                strtLng={this.props.strtLng}
                endLat={this.props.endLat}
                endLng={this.props.endLng}
              />
            </div>
          )}
        </div>
        <div className="comm-step-cont">
          {this.state.showMap && (
            <div className="comm-step">
              <div className="comm-step-title">Step by step </div>
              <div className="comm-step-box">{userStepInfo}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
