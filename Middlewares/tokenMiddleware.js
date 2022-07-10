const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');


const jwtVerification = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-__v");
            console.log('Req User Middleware', req.user);
            next();
        } catch (error) {
            res.status(403);
            throw new Error("Forbidden access");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Unathorized access");
    }
});

module.exports = { jwtVerification };
