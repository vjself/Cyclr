import React, { Component } from "react";
import "./header.css";
import logo from "./headerLogo.png";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  logout() {
    axios.get("/auth/logout").then(user => {
      user.status(200).send(user);
    });
  }

  render() {
    console.log(this.props.user);
    return (
      <header>
        <img src={logo} alt="" />
        {!this.props.user ? (
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
            {this.props.user.id ? (
              <li onClick={this.logout}>
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
    user: reduxState.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
