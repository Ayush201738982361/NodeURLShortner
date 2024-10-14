const express = require("express");
const User = require("../model/user");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

module.exports = router;
