const jwt = require("jsonwebtoken");
var User = require("../models/user");
var ApiError = require("./ErrorTypes");

const SECRET_KEY = "SECRET_KEY";

module.exports = {
    userAuth: async (req, res, next) => {
        try {
            const token = (req.headers['authorization'] ? req.headers.authorization.split(' ')[1] : req.body.token || req.query.token || req.cookies.token);
            if (!token) {
                throw ApiError.PermissionDeniedError;
            }
            const decoded = jwt.verify(token, SECRET_KEY);
            const user = await User.findOne({ username: decoded.username });
            if(!user){
                throw ApiError.UserDNEError;
            }
            req.body.username = decoded.username;
            next();
        } catch (e) {
            if(e instanceof jwt.TokenExpiredError){
                next(ApiError.SessionExpiredError);
            }
            else if(e instanceof jwt.JsonWebTokenError){
                next(ApiError.PermissionDeniedError);
            }
            else{
                next(e);
            }
        }
    }
}
