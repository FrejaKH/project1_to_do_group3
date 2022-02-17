const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        no: {
            type: Number,
            required: true
        },
        place: String,
        zip: {
            type: Number,
            required: true
        },
        town: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model("Department", departmentSchema, 'departments');
