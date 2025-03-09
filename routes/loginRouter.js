const express = require("express");
const app = express(); 
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const tokenGenerate = require("../utils/jwt");

router.get("/",(req,res)=>{
    res.render("login",{ error:null});
})

router.post("/post",async (req,res)=>{
    const {email,password} = req.body;
    const found = await userModel.findOne({email});
    //console.log("found: ",found);
    if(found){
        const hasPass = await bcrypt.compare(password,found.password);
        if(hasPass){
            const payload = {
                email
            }
            const token = tokenGenerate(payload);
            res.cookie('token',token);
            
           return res.redirect("/home")
        }
        else{
            res.render("login",{ error: "Incorrect password" });
        }
    }
    else{
        res.render("login",{ error: "Incorrect username or password" })
    }
})


module.exports = router;