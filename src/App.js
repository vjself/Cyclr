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
          {routes}
        </div>
      </div>
    );
  }
}

export default App;
