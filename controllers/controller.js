const mongoose = require("mongoose");
const mongoConnect = require("../models/MongoConnection");
const Todoschema = require("../models/todoschema");

module.exports = {
  getTodo: async function (que, sort) {
    const db = await mongoConnect.mongoConnect(); // connect to the databse
    const todolist = await Todoschema.find(que, null, sort); // read/find from the database
    db.close();
    return todolist;
  },

  postTodo: async function (req, res, next, user) {
    const db = await mongoConnect.mongoConnect(); // connect to the database
    // new object from the Schema, which says that the values are the values from reg.body which are the datas from the form
    let todolist = new Todoschema({
      title: req.body.title,
      description: req.body.description,
      startdate: req.body.startdate,
      deadline: req.body.deadline,
      priority: req.body.priority,
      userId: user,
    });
    // function that creates documents into the database
    Todoschema.create(todolist, function (error, savedDocument) {
      if (error){
        console.log(error);
      } 
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
