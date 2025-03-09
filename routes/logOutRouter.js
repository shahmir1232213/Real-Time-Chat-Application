const express = require("express");
const app = express(); 
const router = express.Router();

router.post("/", (req, res) => {
    res.cookie("token",'',{expiresIn:'1'})
    res.redirect("/home");  // Redirect to login page after logout
});


module.exports = router;