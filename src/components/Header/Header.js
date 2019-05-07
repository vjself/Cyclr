import React, { Component } from "react";
import "./header.css";
import logo from "./headerLogo.png";
import { connect } from "react-redux";
import { logout, login } from "../../redux/reducer";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    axios.get("/auth/user").then(res => {
      this.props.login(res.data);
    });
  }

  logoutFn = () => {
    axios.post("/auth/logout").then(() => {
      this.props.logout();
      this.props.history.push("/login");
    });
  };

  render() {
    return (
      <header>
        <img src={logo} alt="" />
        {!this.props.user.hasOwnProperty("id") ? (
          <ul className="login-controls">
            <li>
              <NavLink exact to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        ) : (
          <ul className="login-controls">
            <li>
              <NavLink to="/route">Find Route</NavLink>
            </li>
            <li>
              <NavLink to="/donate">Donate</NavLink>
            </li>
            <li>
              <NavLink to="/userRoutes">Your Routes</NavLink>
            </li>
            {this.props.user.hasOwnProperty("id") ? (
              <li onClick={() => this.logoutFn()}>
                <a>Logout</a>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        )}
      </header>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    userRoutes: reduxState.userRoutes
  };
};

const mapDispatchToProps = {
  logout: logout,
  login: login
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
