const mongoose = require("mongoose");

const Request = mongoose.model(
    "Request",
    new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "projects",
        },
        role: String,
        reason: String,
        response: String
    })
);

module.exports = Request;
