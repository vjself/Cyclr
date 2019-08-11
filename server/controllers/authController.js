const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const { email, first_name, last_name, username, password } = req.body;
    let db = req.app.get("db");
    let result = await db.get_user([username]);
    let registeredUser = result[0];
    if (registeredUser) {
      return res.status(409).send("Username already taken.");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      let user = await db.register_user([
        email,
        first_name,
        last_name,
        username,
        hash
      ]);
      req.session.user = {
        email: user[0].email,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        username: user[0].username
      };
      res.status(201).send(req.session.user);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await req.app.get("db").get_user([username]);
    const user = foundUser[0];
    if (!user) {
      return res
        .status(401)
        .send(
          "User  not found. Please register as a new user before logging in."
        )
        .catch(err => {
          err;
        });
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated) {
      return res.status(403).send("Incorrect password");
    }
    req.session.user = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username
    };
    return res.send(req.session.user);
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  getCurrentUser: (req, res) => {
    res.send(req.session.user);
  }
};
