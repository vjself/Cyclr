import React, { Component } from "react";
import "./descinput.css";

export default class DescInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };
  }

  render() {
    return (
      <div>
        <textarea
          className="desc-input"
          placeholder="Enter description here..."
          type="text"
          value={this.state.description}
          onChange={e => {
            this.setState({ input: e.target.value });
          }}
        />
        <br />
        <button
          onClick={() =>
            this.props.updateRouteFn(this.state.input, this.props.id)
          }
        >
          Save
        </button>
      </div>
    );
  }
}
