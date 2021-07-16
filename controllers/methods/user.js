var User = require("../../models/user");
var ApiError = require("../../middleware/ErrorTypes");

const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

module.exports = {
    register: async (username, password) => {
        const exists = await User.findOne({ username: username });
        if (exists) {
            throw ApiError.UserExistsError
        }
        const encryptedPass = await bycrypt.hash(password, saltRounds);

        const userInfo = {
            username: username,
            password: encryptedPass,
            chatLogs: {}
        }

        const newUser = await User.create(userInfo);
        if (!newUser) {
            throw ApiError.InternalError;
        }
        return { success: true };
    },

    login: async (username, password) => {
        const user = await User.findOne({ username: username });
        if (!user) {
            throw ApiError.LoginFailError
        }
        let match = await bycrypt.compare(password, user.password);
        if (!match) {
            throw ApiError.LoginFailError
        }
        const payload = { username: user.username , isAdmin: user.isAdmin};
        const token = jwt.sign(payload, "SECRET_KEY", {
            expiresIn: '1h'
        });
        return {
            success: true,
            body: {
                message: 'Authentication Successful!',
                token: token,
                username: username
            }
        }
    },
    getUserById: async (req, res) => { },
    deleteUserById: async (req, res) => { },
}