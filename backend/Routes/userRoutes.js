const express = require("express");
const router = express.Router();
const { gettingUser, registerUser } = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", gettingUser);

module.exports = router;
