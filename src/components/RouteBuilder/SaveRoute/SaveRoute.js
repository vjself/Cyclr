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
        id
      })
      .then(userRoutes => {
        this.props.saveUserRoute(userRoutes.data);
      })
      .catch(err => {
        alert(err.response.request.response);
      });
  };

  render() {
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
