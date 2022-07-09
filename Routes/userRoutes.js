const express = require('express');
const { allUsers, registerUser, currentUser } = require('../Controllers/userController');
const { jwtVerification } = require('../Middlewares/tokenMiddleware');


const routes = express.Router();

routes.route('/').post(registerUser).get(jwtVerification, allUsers);
routes.post('/login', currentUser);

module.exports = routes;