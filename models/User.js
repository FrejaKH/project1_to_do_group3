const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,9}/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: true
    },
    role: {
        type: String,
        required: true
       
    },
});

module.exports = mongoose.model("User", userSchema, 'users');
