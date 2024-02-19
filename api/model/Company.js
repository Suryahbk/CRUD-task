const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);