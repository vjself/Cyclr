const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();
const massive = require("massive");
require("dotenv").config();
const gC = require("./controllers/gpsController");
const aC = require("./controllers/authController");
const uC = require("./controllers/userRoutesController");
app.use(express.json());

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("DB online.");
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

//AUTH
app.post("/auth/register", aC.register);
app.post("/auth/login", aC.login);
app.get("/auth/logout", aC.logout);

//Directions
app.post("/api/route", gC.getDirections);

//User Routes
app.get("/api/userRoutes", uC.getUserRoutes);
app.post("/api/userRoutes", uC.saveUserRoute);
app.put("/api/userRoutes/:id", uC.updateDescription);
app.delete("/api/userRoutes/:id", uC.deleteUserRoute);

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server just popped off on ${PORT}.`);
});
