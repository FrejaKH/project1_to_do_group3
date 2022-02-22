const mongoose = require("mongoose");
const mongoConnect = require("../models/MongoConnection");
const Todoschema = require("../models/todoschema");

module.exports = {
  getTodo: async function (que, sort) {
    const db = await mongoConnect.mongoConnect(); // connect
    const todolist = await Todoschema.find(que, null, sort); // read
    db.close();
    return todolist;
  },

  postTodo: async function (req) {
    const db = await mongoConnect.mongoConnect(); // connect
    let todolist = new Todoschema({
      title: req.body.title,
      description: req.body.description,
      startdate: req.body.startdate,
      deadline: req.body.deadline,
      priority: req.body.priority,
    });

    Todoschema.create(todolist, function (error, savedDocument) {
      // write dept
      if (error) console.log(error);
      console.log(savedDocument);
      db.close();
    });
  },

  checkBtn: async function (req, res) {
    await mongoConnect.mongoConnect();
    let todoId = req.params.id;
    await Todoschema.findById(todoId, function (err, docs) {
      docs.done = !docs.done;
      if (err) {
        console.log(err);
      } else {
        console.log("Result : ", docs);
      }
      return docs.save();
    });
  },
};
