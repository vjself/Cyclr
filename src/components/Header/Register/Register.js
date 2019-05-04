import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../../redux/reducer";
import { NavLink } from "react-router-dom";
import "./register.css";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      username: "",
      password: ""
    };
  }

  changeHandler = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  register = () => {
    const { email, first_name, last_name, username, password } = this.state;
    axios
      .post("/auth/register", {
        email,
        first_name,
        last_name,
        username,
        password
      })
      .then(user => {
        this.setState({
          email: "",
          first_name: "",
          last_name: "",
          username: "",
          password: ""
        });
        this.props.register(user.data);
      })
      .catch(err => {
        this.setState({
          email: "",
          first_name: "",
          last_name: "",
          username: "",
          password: ""
        });
        alert(err.response.request.response);
      });
  };

  render() {
    const { email, first_name, last_name, username, password } = this.state;
    return (
      <section className="reg-cont">
        <div className="welcome">Welcome to Cyclr!</div>
        <div className="welcome">
          Already a user? Log in <NavLink to="/login">here.</NavLink>
        </div>
        <div className="register">
          <form className="reg-form" onSubmit={e => e.preventDefault()}>
            <input
              name="email"
              type="email"
              placeholder="Email:"
              value={email}
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
            <br />
            <input
              name="first_name"
              placeholder="First name:"
              type="text"
              value={first_name}
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
            <br />
            <input
              name="last_name"
              placeholder="Last name:"
              type="text"
              value={last_name}
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
            <br />

            <input
              name="username"
              type="text"
              placeholder="Username:"
              value={username}
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
            <br />
            <input
              name="password"
              type="password"
              placeholder="Password:"
              value={password}
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
            <br />
            <input type="submit" value="Submit" onClick={this.register} />
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user
  };
};

const mapDispatchToProps = {
  register: register
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
