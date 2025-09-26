const express = require("express");
const router = express.Router();
const { signIn, registerUser } = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", signIn);

module.exports = router;
