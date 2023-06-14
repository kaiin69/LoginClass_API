const jwt = require("jsonwebtoken");
require("dotenv").config();

const decodeSecret = Buffer.from(process.env.JWT_SECRET, "base64").toString("utf-8");

// validez de un token
exports.verifyToken = (req, res, next) => {
    const authorizationHeaders = req.headers.authorization;
    if(!authorizationHeaders) {
        return res.status(404).json({error: "No se proporcionó token"});
    }
    const token = authorizationHeaders.replace("Bearer ","");
    jwt.verify(token, decodeSecret, (err, decoded) => {
        if(err) {s
            return res.status(401).json({error:"Token invalido"});
        }
        req.user = decoded;
        next();
    });
};