const express = require("express");

const router = express.Router();

// Auth controller
const { currentUser, login, logout, register } = require("../controllers/auth");
const { requireSignIn } = require("../middlewares");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignIn, currentUser);

module.exports = router;
