const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    cpr: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{6}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid CPR number!`
        },
        unique: true,
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
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        enum: ['admin', 'regular', 'pending'],
        default: 'pending'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
});

module.exports = mongoose.model("User", userSchema, 'users');
