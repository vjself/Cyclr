import React, { Component } from "react";
import "./steps.css";

export default class Steps extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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
    var instruc = this.htmlr(this.props.instructions);
    var instruc2 = this.htmlr2(instruc);
    return (
      <div className="steps-cont">
        <span className="dis-dur">Distance - {this.props.distance}</span>
        <br />
        <span className="dis-dur">Duration - {this.props.duration}</span>
        <br />
        <span className="dir"> {`${instruc2}.`}</span>
      </div>
    );
  }
}
