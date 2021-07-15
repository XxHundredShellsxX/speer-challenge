var { CustomError } = require("./CustomError");

const TokenNotFoundError = new CustomError(400, "Authentication is required for this request.");
const LoginFailError = new CustomError(400, "The username or password is incorrect.");
const UserExistsError = new CustomError(400, "A User with this username already exists.");
const UserDNEError = new CustomError(400, "User does not exist.");
const InternalError = new CustomError(400, "Internal Server Error");

module.exports = {
    TokenNotFoundError, LoginFailError, UserExistsError, UserDNEError, InternalError
}