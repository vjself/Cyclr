import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <section className="welcome-pic">
      <div className="text">FIND A BETTER PATH.</div>
      <div className="big-text">Map, examine, and archive your bike rides.</div>
      <div className="sign-up-link">
        Don't have an account?
        <br />
        <NavLink to="/register">
          <button className="sign-up-btn">Sign Up!</button>
          <br />
          <br />
        </NavLink>
        otherwise...
        <br />
        <NavLink to="/login">
          <button className="sign-up-btn">Login</button>
        </NavLink>
      </div>
    </section>
  );
}
