const express = require('express');
const { accessChat, fetchChats } = require('../Controllers/chatController');
const { jwtVerification } = require('../Middlewares/tokenMiddleware');

const routes = express.Router();

routes.route('/').post(jwtVerification, accessChat);
routes.route('/').get(jwtVerification, fetchChats);
// routes.route('/group').post(createGroup);
// routes.route('/renameGroup').post(renameGroup);
// routes.route('/addMemberToGroup').post(addMemberToGroup);
// routes.route('/removeMemberFromGroup').post(removeMemberFromGroup);

module.exports = routes;