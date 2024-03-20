const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
let token;
let authHader = req.headers.Authorization || req.headers.authorization;
if(authHader && authHader.startsWith('Bearer')){
    token = authHader.split(" ")[1];
    jwt.verify(token,process.env.ACCSSES_TOKEN_SECRET, (err, decoded) => {
        if (err){
            res.status(401);
            throw new Error("User is not authorized ");
        }
       // console.log(decoded);

       req.user = decoded.user
       next()
    });

    if(!token){
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
}
});

module.exports = validateToken;
