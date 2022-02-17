const mongoose = require("mongoose");

module.exports = {
    mongoConnect: async function () {    // utility function: connect to mongodb server
        const DBS = "localhost";
        const DBN = "employee";
        const CONSTR = `mongodb://${DBS}:27017/${DBN}`;
        const PARAMS = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(CONSTR, PARAMS);
        return mongoose.connection;
    }
};
