const express = require("express");
const { createNewUser, loginUser } = require("../controller/user");
const router = express.Router();

router.post("/", createNewUser);
router.post("/login", loginUser);

module.exports = router;
