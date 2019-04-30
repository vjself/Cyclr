import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Header/Login/Login";
import Register from "./components/Header/Register/Register";
import UserRoutes from "./components/Header/UserRoutes/UserRoutes";
import Donate from "./components/Header/Donate";
import RouteBuilder from "./components/RouteBuilder/RouteBuilder";

export default (
  <Switch>
    <Route component={Login} path="/login" />
    <Route component={RouteBuilder} path="/route" />
    <Route component={Donate} path="/donate" />
    <Route component={UserRoutes} path="/userRoutes" />
    <Route component={Register} exact path="/" />
  </Switch>
);
