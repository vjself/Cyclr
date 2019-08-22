import React, { Component } from "react";
import "./descinput.css";

export default class DescInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };
  }

  myStyle = () => {
    return {
      width: "80%",
      height: "12em",
      color: "black",
      fontSize: "2em"
    };
  };
  boohooStyle = () => {
    return {
      textAlign: "center"
    };
  };

  render() {
    return (
      <div className="boohoo" style={this.boohooStyle()}>
        <textarea
          className="desc-input"
          style={this.myStyle()}
          placeholder="Tell us about it your route..."
          type="text"
          value={this.state.description}
          onChange={e => {
            this.setState({ input: e.target.value });
          }}
        />
        <br />
        <button
          className="go-button"
          onClick={() => {
            this.props.onClose();
            this.props.updateRouteFn(this.state.input, this.props.id);
          }}
        >
          Save
        </button>
      </div>
    );
  }
}
