const mongoose = require('mongoose');


const userSchmea = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },

        email: {
            type: String,
            require: true,
            unique: true,
        },

        photo: {
            type: String,
            require: true,
            default: 'https://cdn-icons.flaticon.com/png/512/552/premium/552909.png?token=exp=1657345208~hmac=ac918460e5a8d2824f7b33ff52789525',
        },

        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    }
)


const User = mongoose.model('User', userSchema);
module.exports = User;
