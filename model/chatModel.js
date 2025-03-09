const { Timestamp } = require("bson");
const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    message:{
        type:String,
        required:true
    }
},
{timestamps:true}
)
const chatModel = mongoose.model('chat',chatSchema);
module.exports = chatModel;