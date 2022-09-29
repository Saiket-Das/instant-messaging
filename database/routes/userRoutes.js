const express = require("express");
const {
  allUsers,
  registerUser,
  currentUser,
} = require("../controllers/userController");
const { jwtVerification } = require("../middlewares/tokenMiddleware");

const routes = express.Router();

routes.route("/").post(registerUser).get(jwtVerification, allUsers);
routes.post("/login", currentUser);

module.exports = routes;
