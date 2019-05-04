import React, { Component } from "react";
import Mapper from "../../Mapper/Mapper";
import { withScriptjs } from "react-google-maps";
import DescModal from "../../DescModal/DescModal";
import Steps from "../../Steps/Steps";
import DescInput from "../../DescModal/DescInput/DescInput";
// import Steps from "../../Steps/Steps";
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
    const MapLoader = withScriptjs(Mapper);
    console.log(this.props.instructions.distance);
    return (
      <div className="user-maps-display">
        <span className="addy-display" onClick={this.showMap}>{`${
          this.props.strtAdd
        } to ${this.props.endAdd}`}</span>
        <button
          className="delete-button"
          onClick={() => this.props.deleteRouteFn(this.props.id)}
        />
        <button onClick={this.toggleDescModal} className="edit-button" />
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
            {!this.props.description ? (
              <div />
            ) : (
              <div className="descrip" type="text-box">
                <br />
                {this.props.description} <br />
              </div>
            )}
            <div className="steps-box">
              <Steps instructions={this.props.instructions} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
