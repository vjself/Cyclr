import React, { Component } from "react";
import CardField from "./CardField/CardField";
import "./donate.css";
// import stringify from "json-stringify-safe";

export default class Donate extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onToken = token => {
    fetch("/api/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      console.log(response.data);
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  render() {
    return (
      <div className="outer-cont">
        <CardField
          token={this.onToken}
          stripeKey="pk_test_p2MAU1TM7HtDrsc3I8CMPixO00xwxYt5LU"
        />
      </div>
    );
  }
}
