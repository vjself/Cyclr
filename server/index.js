const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();
const gC = require("./controllers/gpsController");
const aC = require("./controllers/authController");
const uC = require("./controllers/userRoutesController");
const dC = require("./controllers/donateController");
const cookieParser = require("cookie-parser");
const MemoryStore = require("memorystore")(session);
app.use(cookieParser());
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
    secret: SESSION_SECRET,
    store: new MemoryStore({ maxAge: 60 * 60 * 12 })
  })
);

//AUTH
app.post("/auth/register", aC.register);
app.post("/auth/login", aC.login);
app.post("/auth/logout", aC.logout);
app.get("/auth/user", aC.getCurrentUser);

//Stripe
app.post("/api/token", dC.getToken);

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
