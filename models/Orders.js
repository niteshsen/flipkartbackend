const mongoose = require("mongoose")

const orderShema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
    unique: true
  },
  order_data:{
    type: Array,
    required: true
  }

 

})

const Order = new mongoose.model("Order", orderShema);

module.exports = Order