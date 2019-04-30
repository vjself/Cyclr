import React, { Component } from "react";
import "./header.css";
import logo from "./headerLogo.png";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header>
        <img src={logo} alt="" />
        {!this.props.user ? (
          <ul className="login-controls">
            <li>
              <NavLink activeClassName="active" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/">
                Register
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="login-controls">
            <li className="greeting">{`Hello ${
              this.props.user.first_name
            }!`}</li>
            <li>
              <NavLink activeClassName="active" to="/route">
                Find Route
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/donate">
                Donate
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/userRoutes">
                Your Routes
              </NavLink>
            </li>
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
