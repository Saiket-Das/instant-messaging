const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const generateJsonToken = require('../Database/generateJsonToken')


// ----------------- REGISTER NEW USER -----------------
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, photo } = req.body;


    if (!name || !email) {
        res.status(400);
        throw new Error('Please fill up the all fields')
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
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
            photo: user.photo,
            jwt: generateJsonToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error('User not found')
    }
});



// ----------------- CURRENT LOGGED IN USER -----------------
const currentUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            jwt: generateJsonToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('User not found')
    }
});



// ----------------- ALL USERS -----------------
const allUsers = asyncHandler(async (req, res) => {

    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ]
    } : {};

    const searchUser = await User.find(keyword).find({ _id: { $ne: req.user._id } });;
    res.send(searchUser)
})




module.exports = { registerUser, currentUser, allUsers }