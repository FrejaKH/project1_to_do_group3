const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  done: { type: Boolean, default: false },
  expired: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
