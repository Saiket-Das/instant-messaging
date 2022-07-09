const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');


// ----------------- REGISTER NEW USER -----------------
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, photo } = req.body;


    if (!name || !email) {
        res.status(400);
        throw new Error('Please fill up the all fields')
    }

    const userExit = await User.find({ email });

    if (userExit) {
        res.status(400);
        throw new Error(`Already account created with this ${email}`)
    }


    const user = await User.create({
        name,
        email,
        photo
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            photo: user.photo
        })
    }


    else {
        res.status(400);
        throw new Error('User not found')
    }
});



module.exports = { registerUser }