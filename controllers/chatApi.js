var chat = require("./methods/chat");

module.exports = {
  message: async (req, res, next) => {
    try{
      const messageTo = req.query.to;
      const messageFrom = req.body.username;
      const message = req.body.message;
      const r = await chat.messageUser(messageFrom, messageTo, message);
      return res.status(200).json(r);
    } catch(e) {
      next(e);
    }
  },

  getMessages: async (req, res, next) => {
    try{
      const messageTo = req.query.to;
      const messageFrom = req.body.username;
      const r = await chat.getMessages(messageFrom, messageTo);
      return res.status(200).json(r);
    } catch(e) {
      next(e);
    }
  },
}