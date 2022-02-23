const mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
  // username: {type: Schema.Types.ObjectId, ref: 'User'},
  done: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
