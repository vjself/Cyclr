import React, { Component } from "react";
import "./login.css";
import { connect } from "react-redux";
import { login } from "../../../redux/reducer";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  changeHandler = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  login = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then(user => {
        this.props.login(user.data);
        this.setState({ username: "", password: "" });
        this.props.history.push("/route");
      })
      .catch(err => alert(err.response.request.response));
  };

  render() {
    return (
      <div className="login">
        <span>LOGIN HERE:</span>
        <input
          name="username"
          value={this.state.username}
          type="text"
          placeholder="Username..."
          onChange={e => this.changeHandler(e.target.name, e.target.value)}
        />
        <input
          name="password"
          value={this.state.password}
          type="password"
          placeholder="Password..."
          onChange={e => this.changeHandler(e.target.name, e.target.value)}
        />
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    user: reduxState.user
  };
};

const mapDispatchToProps = {
  login: login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
