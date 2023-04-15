const mongoose = require ("mongoose");

const carouselSchema = new mongoose.Schema({
  id : {
    type : Number
  },

  price : {
    type : Number
  },

  quantity : {
    type : Number
  },

  img : {
    type: String
  },
 
  detail: {
    type: String
  },
  title : {
    type: String
  }
})

const Carousel = new mongoose.model("Carousel" , carouselSchema)
module.exports = Carousel