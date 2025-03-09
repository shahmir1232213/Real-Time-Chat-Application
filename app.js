const express = require("express");
const app = express(); 
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/dbConnection");
const registerRoutes = require("./routes/registerRoute");
const homeRouter = require("./routes/homeRouter");
const loginRouter = require("./routes/loginRouter");
const isLoggedIn = require("./middlewares/isLoggedIn");
const cookieParser = require("cookie-parser");
const userModel = require("./model/userModel");
const chatModel = require("./model/chatModel");
const logOutRouter = require("./routes/logOutRouter");
//const passport = require("passport"); 

const http = require("http");
const httpServer = http.createServer(app);
const socketIO = require("socket.io");
const io = new socketIO.Server(httpServer);
const userNameSpace = io.of("/userNameSpace");
//const expressSession = require("express-session");

app.use(express.urlencoded({extended:true}))
app.use(express.json());

const map = new Map();
userNameSpace.on("connection",async(socket)=>{
    console.log("User Connected: ",socket.id);
    const userId = await socket.handshake.auth.userStatus;
    console.log("userId: ",userId);
    await userModel.findByIdAndUpdate(userId,{$set:{is_online:'1'}})
    socket.broadcast.emit("getOnlineUser",{userId});
    map.set(userId,socket.id)
    console.log(map)
    
    socket.on("disconnect",async()=>{
        await userModel.findByIdAndUpdate(userId,{$set:{is_online:'0'}})
        console.log("disconnected")
        socket.broadcast.emit("getOfflineUser",{userId});
        map.delete(userId)
    })

    socket.on("existChat",async(data)=>{
        const foundChats = await chatModel.find({
            $or:[
                {senderId:data.senderId,recieverId:data.recieverId},
                {senderId:data.recieverId,recieverId:data.senderId}
            ]
        })
        console.log("foundChats: ",foundChats);
        socket.emit("loadChats",{chats:foundChats})
    })

   
})


app.set("views",path.resolve("./views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.use("/userRegister",registerRoutes);
app.use("/login",loginRouter);
app.use("/home",isLoggedIn,homeRouter(userNameSpace,map));
app.use("/logout",logOutRouter);

httpServer.listen(process.env.PORT, () => {
    console.log("Server started at port " + process.env.PORT);
});


