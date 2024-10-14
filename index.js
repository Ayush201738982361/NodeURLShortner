const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const { connectDB } = require("./connection");

const urlRoutes = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouters = require("./routes/user");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 8001;

connectDB("mongodb://127.0.0.1:27017/Short-URL").then(() => {
  console.log("Connected To MongoDB");
});

app.use(checkForAuthentication);
app.use("/url", restrictTo(["NORMAL"]), urlRoutes);
app.use("/", staticRouter);
app.use("/user", userRouters);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.get("/test", async (req, res) => {
//   try {
//     const allURL = await URLModel.find({});
//     res.render("home", { allURL });
//   } catch (error) {
//     res.status(500).send("Server Problem");
//   }
// });

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
