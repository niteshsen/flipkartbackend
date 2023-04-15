const mongoose = require("mongoose");
const validator = require("validator");

const electronicsSchema = new mongoose.Schema({

    id : {
        type : Number,
        
    },
    img : {
        type: String,
       
    },
    title : {
        type : String 
    },

    about : {
        type : String,
       
    },
    discount: {
        type : String,
        
    },
    price : {
        type : Number,
    },
    offPercent : {
        type : String,
    
    },
    rating : {
        type : String,
       
    },
    ratingper : {
        type : String,
        
    }

})

const Electronic = new mongoose.model("Electronic" , electronicsSchema);
module.exports =  Electronic ;
