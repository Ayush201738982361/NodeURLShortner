const express = require("express");
const URLModel = require("../model/url");
const UserModel = require("../model/user");
const router = express.Router();
const { restrictTo } = require("../middleware/auth");

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUsers = await URLModel.find({});
  return res.render("home", { allusers: allUsers });
});

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUsers = await UserModel.find({});
  return res.json({ users: allUsers });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
