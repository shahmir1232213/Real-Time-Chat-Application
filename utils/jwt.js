const jwt = require("jsonwebtoken");
function tokenGenerate(payload){
    // const {name} = payload;
    const token = jwt.sign(payload,process.env.JWT_KEY,{expiresIn:'1h'})
    console.log("token generated: ",token)
    return token;
}
module.exports = tokenGenerate;