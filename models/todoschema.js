const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Todo", todoSchema,);
