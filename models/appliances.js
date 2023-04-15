const mongoose = require("mongoose");
const applianceSchema = new mongoose.Schema({
    id: {
        type : Number
    },
    img: {
        type: String
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    text : {
        type: String
    }
})
const Appliance = new mongoose.model("Appliance", applianceSchema)

module.exports = Appliance