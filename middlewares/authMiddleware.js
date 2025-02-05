const jwt = require("jsonwebtoken");
const { User } = require("../models");

const JWT_SECRET = "secret"; //jwt secret key

const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({ error : "Access Denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ",""),JWT_SECRET); //removing bearer 
        req.userId = decoded.id;
        next();
    } catch(error){
        return res.status(401).json({ error : "Invalid Token" });
    }
};

module.exports = { authenticateUser };