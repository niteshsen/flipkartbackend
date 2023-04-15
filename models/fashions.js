const mongoose = require("mongoose");
const validator = require("validator");

const fashionSchema = new mongoose.Schema({
    id : {
        type: Number,
        unique: true
    },
    img: {
        type: String
    },
    brand: {
        type: String
    },
    title: {
        type: String
    },
    color: {
        type: String
    },

    price: {
        type: Number
    },
    discountPrice:{
        type : String
    },
    off:{
        type : String
    },
    bankOffer:{
        type : String
    },
    bank:{
        type : String
    }
})

const Fashion = new mongoose.model("Fashion", fashionSchema);

module.exports = Fashion