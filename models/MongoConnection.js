const mongoose = require("mongoose");

module.exports = {
    mongoConnect: async function () {    // utility function: connect to mongodb server
        const server = "127.0.0.1";
        const database = "tododatabase";
        const CONSTR = `mongodb://${server}:27017/${database}`;
        const PARAMS = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(CONSTR, PARAMS);
        return mongoose.connection;
    }
};

