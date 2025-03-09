const userModel = require("../model/userModel");
const chatModel = require("../model/chatModel");

async function homeRender (req,res){
    const users = await userModel.find({ _id: { $ne: req.user._id } });
    //console.log("_id:")
   

    // console.log("found: ",foundChats);
    res.render("home", { users: users,user_loggedin: req.user,});
}

module.exports = {
    homeRender
}