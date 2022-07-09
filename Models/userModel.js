const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },

        email: {
            type: String,
            require: true,
            unique: true
        },
        photo: {
            type: String,
            require: true,
            default: "https://cdn-icons.flaticon.com/png/512/552/premium/552909.png?token=exp=1655876072~hmac=90e4bf1d43e2c423c778631e405fafec"
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)


userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;