const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const isUserLoggedIn = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.json({ message: "Authorization failed" });
    }
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.json(error);
  }
};

module.exports = isUserLoggedIn;
