const express = require("express");
const userRouter = require("./router/user");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const quizRouter = require("./router/Quizz");
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(quizRouter);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(9000, () => {
  console.log("server is running");
});
