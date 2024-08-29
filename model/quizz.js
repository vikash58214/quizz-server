const mongoose = require("mongoose");
const quizzSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizName: { type: String, required: true },
  quizType: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      selectedOption: { type: String, required: true },
      options: [
        {
          value: { type: String },
          value2: { type: String },
          correct: { type: Boolean, default: false },
        },
      ],
      timer: { type: String, default: "OFF" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model("Quiz", quizzSchema);

module.exports = Quiz;
