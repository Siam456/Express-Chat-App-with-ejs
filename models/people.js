const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        avater: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user" , "admin"],
            default: "user"
        },
    },
    {
        timestamps: true,
    }
);

const people = mongoose.model("people", userSchema);

module.exports = people;