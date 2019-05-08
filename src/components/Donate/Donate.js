import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import "./donate.css";

export default class Donate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: null
    };
  }

  handleAmount = value => {
    this.setState({
      amount: value
    });
  };

  clearInput = () => {
    this.setState({
      amount: 0
    });
  };

  onToken = token => {
    axios
      .post("/api/token", { stripeToken: token.id, amount: this.state.amount })
      .then(res => {
        console.log(res.data);
      });
    this.clearInput();
  };

  render() {
    return (
      <div className="donate-cont">
        <h1> Make a donation?</h1>
        <br />
        <br />
        <input
          type="number"
          placeholder="Amount?"
          value={this.state.amount}
          onChange={e => {
            this.handleAmount(e.target.value);
          }}
        />
        <br />
        <StripeCheckout
          name="Cyclr"
          description="Make a donation!"
          panelLabel="Make Donation!"
          amount={("$", this.state.amount * 100)}
          token={this.onToken}
          stripeKey="pk_test_p2MAU1TM7HtDrsc3I8CMPixO00xwxYt5LU"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgoS83usvxagVAfmgo2f9cQW8e6ds6Yp25xCqz96Io8GQVrevGZg"
        />
      </div>
    );
  }
}
