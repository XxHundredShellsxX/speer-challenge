var express = require("express");
var router = express.Router();

// Require controller modules.
var users = require("../controllers/userApi");

/// USER ROUTES ///

// POST create user
router.post("/register", users.register);

// GET get user by id
router.get("/:id", users.getUserById);

// POST login user
router.post("/login", users.login);

// post delete user by id
router.delete("/:id", users.login);


module.exports = router;
