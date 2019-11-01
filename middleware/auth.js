const jwt = require("jsonwebtoken");

const config = require("config");

module.exports = function(req, res, next) {
  // Get the token from the header
  const token = req.header("x-auth-token");

  // Check if it does not exist
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid, authorization denied" });
  }
};
