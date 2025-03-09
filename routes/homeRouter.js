const express = require("express");
const app = express(); 
const router = express.Router();
const controllers = require("../controllers/homeRender");
const chatSave = require("../controllers/chatSaving");

function homeRouter(userNameSpace,map){
    router.get("/",controllers.homeRender);
    router.post("/chatSave",(req,res)=>
            chatSave(userNameSpace,map,req,res)
        
    )
    
    return router;
}


module.exports = homeRouter;