const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoUtil = require("../models/MongoUtil");
const User = require("../models/User");

module.exports = {
    getUser: async function (que, sort) {
        const db = await mongoUtil.mongoConnect();                          // connect
        const depts = await Dept.find(que, null, sort);                     // read
        db.close();
        return books;
    },

    postUser: async function (req) {
        const db = await mongoUtil.mongoConnect();                          // connect
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            let user = new User({                                           // create obejct in schema-format
                cpr: req.body.cpr,
                email: req.body.email,
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                password: hash,
                department: req.body.department
            });
            User.create(user, function(error, savedDocument) {
                if (error) console.log(error);
                db.close();
            });
        });
    }
};
