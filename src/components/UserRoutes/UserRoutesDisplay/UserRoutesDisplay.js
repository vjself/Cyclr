import React, { Component } from "react";
import Mapper from "../../Mapper/Mapper";
import { withScriptjs } from "react-google-maps";
import DescModal from "./DescModal/DescModal";
import DescInput from "./DescModal/DescInput/DescInput";
import "./userRoutesDisplayFixed.css";

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
    return (
      <div className="user-maps-display">
        <span className="addy-display" onClick={this.showMap}>{`${
          this.props.strtAdd
        } to ${this.props.endAdd}`}</span>
        <button
          className="delete-button"
          onClick={() => this.props.deleteRouteFn(this.props.id)}
        >
          Delete
        </button>
        {this.state.showMap === true ? (
          <div>
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
            {!this.props.description ? (
              <div>
                <button onClick={this.toggleDescModal}>Add Description:</button>
                <DescModal
                  show={this.state.openDescModal}
                  onClose={this.toggleDescModal}
                >
                  <DescInput
                    updateRouteFn={this.props.updateRouteFn}
                    id={this.props.id}
                  />
                </DescModal>{" "}
              </div>
            ) : (
              <p>{this.props.description}</p>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
