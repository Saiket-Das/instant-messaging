const express = require('express');
const { allUsers, registerUser } = require('../Controllers/userController');

const routes = express.Router();

routes.route('/').post(registerUser).get(allUsers);

module.exports = routes;