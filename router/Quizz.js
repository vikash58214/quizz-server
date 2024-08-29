const express = require("express");
const quizRouter = express.Router();
const Quiz = require("../model/quizz");

quizRouter.post("/createQuiz", async (req, res) => {
  try {
    const { userId, quizName, questions, quizType } = req.body;

    const newQuiz = new Quiz({
      userId,
      quizName,
      quizType,
      questions,
    });
    const quiz = await newQuiz.save();
    res.status(201).json({ message: "Quizz created", quiz });
  } catch (error) {
    res.json(error);
  }
});

quizRouter.get(`/getQuizz/:quizID`, async (req, res) => {
  try {
    const quizID = req.params.quizID;
    const quiz = await Quiz.findById(quizID);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(404).json(error);
  }
});

quizRouter.get("/allQuiz/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const quiz = await Quiz.find({ userId: userID });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(404).json(error);
  }
});

quizRouter.delete("/deleteQuiz/:quizID", async (req, res) => {
  try {
    const quizId = req.params.quizID;
    await Quiz.findByIdAndDelete(quizId);
    res.send("quiz deleted");
  } catch (error) {
    res.status(404).json(error);
  }
});

quizRouter.put("/updateQuestion/:quizID", async (req, res) => {
  try {
    const quizID = req.params.quizID;
    const updatedQuestion = req.body.questions;
    const updateQuiz = await Quiz.findByIdAndUpdate(
      quizID,
      { questions: updatedQuestion },
      { new: true }
    );

    res.status(200).json({ message: "updated", updateQuiz });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = quizRouter;
