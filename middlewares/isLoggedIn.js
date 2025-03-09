const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

async function isLoggedIn(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("No token provided");
            return res.redirect("/login");
        }

        console.log("req.headers.cookie: ", req.headers.cookie);

        // Verify token inside try-catch to prevent crashes
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Find the user in DB
        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            console.log("User not found, logging out...");
            res.clearCookie("token");
            return res.redirect("/login");
        }

        req.user = user; // Attach user to request
        next(); // Proceed if everything is fine
    } catch (error) {
        console.error("JWT Verification Error:", error.message);

        // Clear token if it's invalid/malformed
        res.clearCookie("token");
        return res.redirect("/login");
    }
}

module.exports = isLoggedIn;
