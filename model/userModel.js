const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    is_online:{
        type:String,
        default:'0'
    }
},
{timestamps:true}
)
const users = mongoose.model('user',userSchema);
module.exports = users;