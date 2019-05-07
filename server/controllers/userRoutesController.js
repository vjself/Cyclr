module.exports = {
  saveUserRoute: async (req, res) => {
    const {
      strtAdd,
      endAdd,
      strtLat,
      strtLng,
      endLat,
      endLng,
      description,
      duration,
      distance,
      newStep,
      id
    } = req.body;
    let db = await req.app.get("db");
    let userRoutes = await db.save_user_route([
      strtAdd,
      endAdd,
      strtLat,
      strtLng,
      endLat,
      endLng,
      description,
      duration,
      distance,
      newStep,
      id
    ]);
    return res
      .status(200)
      .send(userRoutes)
      .catch(err => {
        alert(err);
      });
  },

  getUserRoutes: async (req, res) => {
    let userRoutes = await req.app
      .get("db")
      .get_user_routes([req.session.user.id]);
    return res
      .status(200)
      .send(userRoutes)
      .catch(err => {
        err;
      });
  },

  deleteUserRoute: async (req, res) => {
    const { id } = req.params;
    let userRoutes = await req.app
      .get("db")
      .delete_user_route([id, req.session.user.id]);
    return res
      .status(200)
      .send(userRoutes)
      .catch(err => {
        err;
      });
  },

  updateDescription: async (req, res) => {
    const { id } = req.params;
    const { desc } = req.body;
    let userRoutes = await req.app
      .get("db")
      .update_description([id, req.session.user.id, desc]);
    return res
      .status(200)
      .send(userRoutes)
      .catch(err => {
        err;
      });
  }
};
