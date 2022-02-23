const bcrypt = require("bcryptjs");
const mongoConnect = require("../models/MongoConnection");
const User = require("../models/User");

module.exports = {
    getUser: async function (que, sort) {
        const db = await mongoConnect.mongoConnect();                          // connect
        const users = await User.find(que, null, sort);                     // read
        db.close();
        return users;
    },
    postNewUser: async function (req) {
        const db = await mongoConnect.mongoConnect();                          // connect
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            let user = new User({                                           // create obejct in schema-format
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                role: "user",
                status: "inactive"
            });
            User.create(user, function(error) {
                if (error){
                    console.log(error);
                    db.close();
                    return true;
                }else{
                    db.close();
                    return true;
                } 
            });
        });
    },
    updateUser: async function (req, x, y, status, user) {
        const db = await mongoConnect.mongoConnect();                        // connect
            User.findOneAndUpdate({username: user}, {status: status}, function(error) {
                        if (error){
                            console.log(error);
                        }
                        db.close();
                    }); 
    }
};
