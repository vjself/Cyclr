import React from "react";
import "./steps.css";

export default function Steps(props) {
  return (
    <div className="steps-cont">
      <span className="dis-dur">Distance - {props.distance}</span>
      <br />
      <span className="dis-dur">Duration - {props.duration}</span>
      <br />
      <span className="dir"> {`${props.instructions}.`}</span>
    </div>
  );
}
