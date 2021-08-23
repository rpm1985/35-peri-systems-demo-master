const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const employeeModel = new Schema(
    {
        _id: Schema.Types.ObjectId,
        role: String,
        name: {
            first: String,
            last: String,
        },
        email: String,
        password: String
    },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("employees", employeeModel);

