const mongoose = require("mongoose");

const DemandSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    tag: {
        type: String,
        price: Number
    },
    price: {
        type: Number,
        price: Number
    },
},
    { timeStamps: true }
);

module.exports = mongoose.model("Demand", DemandSchema);
