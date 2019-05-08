import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  getUserRoutes,
  deleteUserRoute,
  updateUserRoute
} from "../../redux/reducer";
import UserRoutesDisplay from "./UserRoutesDisplay/UserRoutesDisplay";
import "./userRoutes.css";

class UserRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false
    };
  }

  componentDidMount() {
    this.getUserRoutes();
  }

  getUserRoutes = () => {
    axios.get("/api/userRoutes").then(res => {
      this.props.getUserRoutes(res.data);
    });
  };

  updateRoute = (desc, id) => {
    axios.put(`/api/userRoutes/${id}`, { desc }).then(res => {
      this.props.updateUserRoute(res.data);
    });
  };

  deleteRoute = id => {
    axios.delete(`/api/userRoutes/${id}`).then(res => {
      this.props.deleteUserRoute(res.data);
    });
  };

  render() {
    let routeInstance = this.props.userRoutes.map((e, i) => {
      return (
        <UserRoutesDisplay
          key={e.id}
          routes={this.props.userRoutes}
          strtAdd={e.strt_add}
          endAdd={e.end_add}
          strtLat={e.strt_lat}
          strtLng={e.strt_lng}
          endLat={e.end_lat}
          endLng={e.end_lng}
          distance={e.distance}
          duration={e.duration}
          description={e.description}
          instructions={e.steps}
          id={e.id}
          deleteRouteFn={this.deleteRoute}
          updateRouteFn={this.updateRoute}
        />
      );
    });
    return (
      <div className="user-routes">
        <div className="user-route-title">Saved Routes</div>
        {routeInstance}
      </div>
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
  getUserRoutes: getUserRoutes,
  deleteUserRoute: deleteUserRoute,
  updateUserRoute: updateUserRoute
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRoutes);
