const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    id: {
        type : Number
    },
    img: {
        type: String
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    price: {
        type: Number
    },
    discount: {
        type: String
    },
    offPercent: {
        type: String
    },
    rating: {
        type: String
    },
    ratingper: {
        type: String
    }
})
const House = new mongoose.model("House", houseSchema)

module.exports = House;