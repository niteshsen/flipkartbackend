const mongoose = require("mongoose");

const flipDataSchema = new mongoose.Schema({
 img:{
    type:String
 },
 brand:{
    type:String
 },
 title:{
    type:String
 },
 color:{
    type:String
 },
 price:{
    type:Number
 },
 discountprice:{
    type:String
 },
 off:{
    type:String
 },
 bankOffer:{
    type:String
 },

 bank:{
    type:String
 },
 qty:{
    type:Number
 },
 id:{
    type: Number
 },
 about:{
    type:String
 },
 offPercent:{
    type:String
 },

 rating:{
    type:String
 },
 ratingper:{
    type:String
 }


})

const FlipkartData = new mongoose.model("FlipkartData" , flipDataSchema)
module.exports = FlipkartData;
