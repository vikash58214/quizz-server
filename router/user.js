const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userRouter = express.Router();
const dotenv = require("dotenv");
const isUserLoggedIn = require("../middleWare/user");

dotenv.config();

userRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (user) {
      return res.json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json({ message: "User registered success" });
  } catch (error) {
    res.json(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.json({ message: "User not exist,SignUp first" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.json({ message: "Invalid Password" });
    }
    const jwToken = jwt.sign(user, process.env.JWT_KEY);
    res.json({ message: "success", token: jwToken });
  } catch (error) {
    res.json(error);
  }
});

userRouter.get("/getUser", isUserLoggedIn, (req, res) => {
  res.json(req.user);
});

module.exports = userRouter;
