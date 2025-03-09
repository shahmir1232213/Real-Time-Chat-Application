const mongoose = require("mongoose");
const connectDB = mongoose.connect(process.env.MONGODB_URI)
.then((res)=>{
    console.log("Mongoose Connected");
}).catch((err)=>{
    console.log("Error: ",err);
})
module.exports = connectDB;
