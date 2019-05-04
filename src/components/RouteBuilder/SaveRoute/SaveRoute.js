import React, { Component } from "react";
import { connect } from "react-redux";
import { saveUserRoute } from "../../../redux/reducer";
import axios from "axios";

class SaveRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  saveUserRoute = () => {
    const {
      strtAdd,
      endAdd,
      strtLat,
      strtLng,
      endLat,
      endLng,
      duration,
      distance,
      steps,
      id
    } = this.props;
    axios
      .post("/api/userRoutes", {
        strtAdd,
        endAdd,
        strtLat,
        strtLng,
        endLat,
        endLng,
        duration,
        distance,
        steps,
        id
      })
      .then(userRoutes => {
        console.log("FRONT-RES --->", userRoutes.data);
        this.props.saveUserRoute(userRoutes.data);
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <button className="save-route-btn" onClick={this.saveUserRoute}>
          Save Route
        </button>
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
  saveUserRoute: saveUserRoute
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveRoute);
