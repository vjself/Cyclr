import Header from "./components/Header/Header";
import routes from "./routes";
import "./app.css";

import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="App">
          <Header />
          <div className="outer-cont">{routes}</div>
        </div>
      </div>
    );
  }
}

export default App;

// 56f652835d226e5229e9c1d08f
