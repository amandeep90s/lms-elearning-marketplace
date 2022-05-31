const express = require("express");

const router = express.Router();

// Auth controller
const { login, logout, register } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
