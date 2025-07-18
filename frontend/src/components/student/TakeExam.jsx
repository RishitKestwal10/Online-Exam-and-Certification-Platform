import React, { useState } from "react";
import "./TakeExam.css";

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: "Mars",
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: "Pacific",
  },
];

const TakeExam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionChange = (option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setReviewMode(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    setReviewMode(false);
    setSubmitted(true);
  };

  const handleEditAnswer = (index) => {
    setReviewMode(false);
    setCurrentIndex(index);
  };

  return (
    <div className="exam-container">
      <h2 className="exam-title">Course Exam</h2>

      {submitted ? (
        <div className="result-section">
          <h3>Results:</h3>
          {questions.map((q, index) => (
            <div key={q.id} className="result">
              <strong>Q{index + 1}:</strong> {q.question}
              <br />
              Your answer:{" "}
              <span className={answers[q.id] === q.correct ? "correct" : "wrong"}>
                {answers[q.id] || "Not Answered"}
              </span>
              {" | "}
              Correct answer: {q.correct}
            </div>
          ))}
        </div>
      ) : reviewMode ? (
        <div className="review-section">
          <h3>Review Your Answers</h3>
          {questions.map((q, index) => (
            <div key={q.id} className="review-item">
              <strong>Q{index + 1}:</strong> {q.question}
              <br />
              Answer: <em>{answers[q.id] || "Not Answered"}</em>
              <button className="edit-btn" onClick={() => handleEditAnswer(index)}>
                Edit
              </button>
            </div>
          ))}
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Exam
          </button>
        </div>
      ) : (
        <div className="question-card">
          <p className="question">
            Q{currentIndex + 1}. {currentQuestion.question}
          </p>
          <div className="options">
            {currentQuestion.options.map((opt, i) => (
              <label key={i} className="option">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={opt}
                  checked={answers[currentQuestion.id] === opt}
                  onChange={() => handleOptionChange(opt)}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="button-group">
            <button
              className="back-btn"
              onClick={handleBack}
              disabled={currentIndex === 0}
            >
              Back
            </button>

            <button className="submit-btn" onClick={handleNext}>
              {currentIndex === questions.length - 1 ? "Review Answers" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeExam;
