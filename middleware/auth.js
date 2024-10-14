const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  console.log("Cookies:", req.cookies);
  const tokenCookie = req.cookies.token;

  if (!tokenCookie) {
    console.log("No token cookie found");
    return next();
  }

  const token = tokenCookie;
  try {
    const user = getUser(token);
    req.user = user;
    console.log("User authenticated:", user);
  } catch (error) {
    console.error("Error getting user:", error);
  }
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      console.log("User not authenticated, redirecting to login");
      return res.redirect("/login");
    }

    if (!roles.includes(req.user.role)) {
      console.log("User role not authorized:", req.user.role);
      return res.status(403).end("Unauthorized");
    }

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
