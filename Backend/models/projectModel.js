const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectModel = new Schema({
    _id: Schema.Types.ObjectId,
    number: String,
    name: String,
    system: String,
    sector: String,
    description: String,
    client: String,
    engineers: {
        sales_engineer_id: { type: Schema.Types.ObjectId, ref: "User" },
        technical_lead_id: { type: Schema.Types.ObjectId, ref: "User" },
        designer_id: { type: Schema.Types.ObjectId, ref: "User" },
        design_checker_id: { type: Schema.Types.ObjectId, ref: "User" },
    },
    date_required: Date,
    anticipated_date: Date,
    status: {
        time_set: Date,
        value: String,
    },
    status_history: [
        {
            time_set: Date,
            value: String,
        },
    ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
    approved: String,
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("projects", projectModel);
