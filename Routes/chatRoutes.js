const express = require('express');
const { accessChat, fetchChats, createGroupChat, renameGrouoChat } = require('../Controllers/chatController');
const { jwtVerification } = require('../Middlewares/tokenMiddleware');

const routes = express.Router();

routes.route('/').post(jwtVerification, accessChat);
routes.route('/').get(jwtVerification, fetchChats);
routes.route('/group').post(jwtVerification, createGroupChat);
routes.route('/renameGroupChat').put(jwtVerification, renameGrouoChat);
// routes.route('/addMemberToGroup').post(addMemberToGroup);
// routes.route('/removeMemberFromGroup').post(removeMemberFromGroup);

module.exports = routes;