import React, { Component } from "react";
import "./steps.css";

export default class Steps extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="steps-cont">
        <span className="dis-dur">Distance - {this.props.distance}</span>
        <br />
        <span className="dis-dur">Duration - {this.props.duration}</span>
        <br />
        <span className="dir"> {`${this.props.instructions}.`}</span>
      </div>
    );
  }
}
