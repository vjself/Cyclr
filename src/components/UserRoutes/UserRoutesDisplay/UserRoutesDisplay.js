import React, { Component } from "react";
import Mapper from "../../Mapper/Mapper";
import { withScriptjs } from "react-google-maps";
import DescModal from "../../DescModal/DescModal";
import Steps from "../../Steps/Steps";
import DescInput from "../../DescModal/DescInput/DescInput";
import "./userRoutesDisplay.css";

export default class UserRoutesDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      showMap: false,
      openDescModal: false
    };
  }

  showMap = () => {
    this.setState({
      showMap: !this.state.showMap
    });
  };

  toggleDescModal = () => {
    this.setState({
      openDescModal: !this.state.openDescModal
    });
  };

  render() {
    console.log("Props routes", this.props.routes[0]);
    let instruc = this.props.routes[0].steps;
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
      <div className="user-maps-display">
        <span className="addy-display" onClick={this.showMap}>
          {`${this.props.strtAdd} to ${this.props.endAdd}`}
          <button
            className="delete-button"
            onClick={() => this.props.deleteRouteFn(this.props.id)}
          />
          <button onClick={this.toggleDescModal} className="edit-button" />
        </span>
        <br />
        <span className="dist-display">Distance - {this.props.distance}</span>
        <br />
        <span className="dist-display">Duration - {this.props.duration}</span>
        <DescModal
          show={this.state.openDescModal}
          onClose={this.toggleDescModal}
        >
          <DescInput
            updateRouteFn={this.props.updateRouteFn}
            id={this.props.id}
          />
        </DescModal>
        {this.state.showMap === true && (
          <div className="map">
            {" "}
            <div className="map-window2">
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
            <div className="step-disp">Step by step: </div>
            <div className="steps-box">{userStepInfo}</div>
          </div>
        )}
        {!this.props.description ? (
          <div />
        ) : (
          <div className="descrip" type="text-box">
            {this.props.description} <br />
          </div>
        )}
      </div>
    );
  }
}
