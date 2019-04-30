const axios = require("axios");
let route = null;

module.exports = {
  getDirections: (req, res) => {
    const { origin, dest } = req.body;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&avoid=highways&mode=bicycling&key=${
          process.env.REACT_APP_API_KEY
        }`
      )
      .then(response => {
        route = response.data;
        res
          .status(200)
          .send(route)
          .catch(err => {
            err;
          });
      });
  }
};
