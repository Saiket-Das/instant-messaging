const express = require('express');
const { accessChat, fetchChats, createGroupChat, renameGrouoChat, addNewUserToGroup, removeUserFromGroup } = require('../Controllers/chatController');
const { jwtVerification } = require('../Middlewares/tokenMiddleware');

const routes = express.Router();

routes.route('/').post(jwtVerification, accessChat);
routes.route('/').get(jwtVerification, fetchChats);
routes.route('/group').post(jwtVerification, createGroupChat);
routes.route('/renameGroupChat').put(jwtVerification, renameGrouoChat);
routes.route('/addNewUserToGroup').put(jwtVerification, addNewUserToGroup);
routes.route('/removeUserFromGroup').put(jwtVerification, removeUserFromGroup);

module.exports = routes;