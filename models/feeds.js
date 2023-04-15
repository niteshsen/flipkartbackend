const mongoose = require("mongoose")

const feedSchema = mongoose.Schema({
    id: {
        type: Number
    },
    price: {
        type: Number
    },
    quentity: {
        type: Number
    },
    img: {
        type: String
    },
    title: {
        type: String
    },
    text: {
        type: String
    }

})

const Feed = new mongoose.model("Feed", feedSchema)

module.exports = Feed