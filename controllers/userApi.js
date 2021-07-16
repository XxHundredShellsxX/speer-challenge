var user = require("./methods/user");

module.exports = {
  register: async (req, res, next) => {
    try{
      const { username, password } = req.body;
      const r = await user.register(username, password);
      return res.status(200).json("New User Created!");
    } catch(e) {
      next(e);
    }
  },

  login: async (req, res, next) => {
    try{
      const { username, password } = req.body;
      const r = await user.login(username, password);
      res.cookie('token', r.body.token, { httpOnly: true });
      return res.status(200).json(r.body);
    } catch(e) {
      next(e)
    }
  },
  getUserById: async (req, res) => { },
  deleteUserById: async (req, res) => { },
}