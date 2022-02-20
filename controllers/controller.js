const mongoose = require("mongoose");
const mongoConnect = require("../models/MongoConnection");
const Todoschema = require("../models/todoschema");

module.exports = {
    getTodo: async function (que, sort) {
        // opret forbindelse til mongodb
        const db = await mongoConnect.mongoConnect();                                // connect
        const todolist = await Todoschema.find(que, null, sort);                     // read
        db.close();
        return todolist;
    },

    postTodo: async function (req) {
        const db = await mongoConnect.mongoConnect();                                // connect
        let todolist = new Todoschema({
            title: req.body.title,
            description: req.body.description,
            startdate: req.body.startdate,
            deadline: req.body.deadline,
            priority: req.body.priority 
        });
        
       
        Todoschema.create(todolist, function(error, savedDocument) {                  // write todo
            if (error)
                console.log(error);
            console.log(savedDocument);
            db.close();
        });
    }
}

