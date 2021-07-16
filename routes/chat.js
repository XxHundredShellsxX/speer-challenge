var express = require("express");
var router = express.Router();

// Require controller modules.
const chat = require("../controllers/chatApi");
const auth = require("../middleware/WebTokenAuth");


// POST message user
router.post("/message", auth.userAuth, chat.message);

// GET message user
router.get("/message", auth.userAuth, chat.getMessages);

module.exports = router;
