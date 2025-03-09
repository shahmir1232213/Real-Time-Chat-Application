const express = require("express");
const app = express(); 
const router = express.Router();
const upload = require("../config/multerConfig.js");
const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt")

router.get("/",(req,res)=>{
    res.render("userRegister");
})

router.post("/post",upload.single("image"),async (req,res)=>{
// console.log("req.body: ",req.body);
// console.log("req.file: ",req.file.filename);
    const hashPass = await bcrypt.hash(req.body.password,10);
     await userModel.create({
        name:req.body.name,
        email:req.body.email,
        password:hashPass,
        image:req.file.filename
     })
     res.redirect("/login");
})

module.exports = router;