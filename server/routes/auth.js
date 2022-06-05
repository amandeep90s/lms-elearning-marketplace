const express = require("express");
// Express Router
const router = express.Router();
// Auth controller
const { currentUser, login, logout, register } = require("../controllers/auth");
// Middleware
const { requireSignIn } = require("../middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignIn, currentUser);

module.exports = router;
