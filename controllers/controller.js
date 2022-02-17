const mongoose = require("mongoose");
const mongoUtil = require("../models/MongoUtil");
const Department = require("../models/Dept");

module.exports = {
    getDepts: async function (que, sort) {
        const db = await mongoUtil.mongoConnect();                                // connect
        const depts = await Department.find(que, null, sort);                     // read
        db.close();
        return depts;
    },

    postDept: async function (req) {
        const db = await mongoUtil.mongoConnect();                                // connect
        let address = {
            street: req.body.street,
            no: req.body.no,
            place: req.body.place,
            zip: req.body.zip,
            town: req.body.town 
        };
        
        let dept = new Department({                                               // create obejct in schema-format
            name: req.body.name,
            address: address
        });
        
        Department.create(dept, function(error, savedDocument) {                  // write dept
            if (error)
                console.log(error);
            console.log(savedDocument);
            db.close();
        });
    }
}
