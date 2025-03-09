const { isObjectIdOrHexString } = require("mongoose");
const chatModel = require("../model/chatModel");
async function chatSave(userNameSpace,map,req,res){
    const chat = await chatModel.create({
        senderId: req.body.sender,
        recieverId: req.body.reciever, 
        message: req.body.message
    })
    const recieverSocketId = map.get(req.body.reciever);
    // console.log("req.body.reciever: ",req.body.reciever)
    // console.log("Reciver Socket Id: ",recieverSocketId)
    // console.log("current map: ",map)
    if(recieverSocketId){
        userNameSpace.to(recieverSocketId).emit("message",
            {
                sender:req.body.sender,
                message: req.body.message
            }
        )
    }
    
}

module.exports = chatSave
