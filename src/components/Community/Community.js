import React, { Component } from "react";
import CommunityDisplay from "./CommunityDisplay/CommunityDisplay";
import { connect } from "react-redux";
import { getAllUserRoutes } from "../../redux/reducer";
import axios from "axios";

class Community extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false
    };
  }

  componentDidMount() {
    axios.get("/api/community").then(res => {
      this.props.getAllUserRoutes(res.data);
    });
  }

  render() {
    console.log(this.props.userRoutes);
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
      <div className="user-routes">
        <div
          className="user-route-title"
          style={{
            textDecoration: "underline",
            marginBottom: "20px"
          }}
        >
          Community
        </div>
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
  getAllUserRoutes: getAllUserRoutes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Community);
