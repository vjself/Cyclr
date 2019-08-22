import React, { Component } from "react";
import CommunityDisplay from "./CommunityDisplay/CommunityDisplay";
import { connect } from "react-redux";
import "./comm.css";
import { getAllUserRoutes } from "../../redux/reducer";
import axios from "axios";

class Community extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    axios.get("/api/community").then(res => {
      this.props.getAllUserRoutes(res.data);
    });
  }

  render() {
    let routeInstance = this.props.userRoutes.map((e, i) => {
      return (
        <CommunityDisplay
          key={e.id}
          firstName={e.first_name}
          username={e.username}
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
        />
      );
    });
    return (
      <div className="comm-routes-cont">
        <div className="comm-title">
          <div>Community</div>
          <div>Step-by-Step</div>
        </div>
        <div className="comm-routes">{routeInstance}</div>
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
  getAllUserRoutes: getAllUserRoutes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Community);
