const mongoose = require("mongoose")

mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(()=>console.log("connected successfully"))
.catch((e)=>console.log(e))
       