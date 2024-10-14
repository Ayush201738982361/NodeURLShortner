const { create } = require("../model/url");
const User = require("../model/user");
const { setUser } = require("../service/auth");

async function createNewUser(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("home");
}

async function loginUser(req, res) {
  const { email, password } = req.body; //Catch
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { err: "Enter a valid username or password" });
  }
  const token = setUser(user);
  res.cookie("token", token);
  // return res.json({ token });
  return res.render("home");
}

module.exports = {
  createNewUser,
  loginUser,
};
