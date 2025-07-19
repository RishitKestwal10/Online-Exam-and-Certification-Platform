import React, { useState, useEffect, useCallback } from "react";
import "./TakeExam.css";

const questions = [
  {
    question: "What is the capital of France?",
    options: { A: "Berlin", B: "Madrid", C: "Paris", D: "Rome" },
    correctAnswer: "C",
  },
  {
    question: "Which language runs in a web browser?",
    options: { A: "Java", B: "C", C: "Python", D: "JavaScript" },
    correctAnswer: "D",
  },
  {
    question: "What is 2 + 2?",
    options: { A: "3", B: "4", C: "5", D: "6" },
    correctAnswer: "B",
  },
];
// ... import section remains the same ...
const TakeExam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewFlags, setReviewFlags] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes

  // Submit Handler
  const handleSubmit = useCallback(() => {
    console.log("Submitted Answers:", answers);
    alert("✅ Exam submitted successfully!");
  }, [answers]);

  // ⏱ Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("⏰ Time is up!");
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit]);

  // 🚫 Student Protection
  useEffect(() => {
    const disableContext = (e) => e.preventDefault();
    const disableShortcuts = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && (e.key === "u" || e.key === "U")) ||
        (e.ctrlKey && e.shiftKey && ["I", "i", "J", "j", "C", "c"].includes(e.key))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", disableContext);
    document.addEventListener("keydown", disableShortcuts);
    return () => {
      document.removeEventListener("contextmenu", disableContext);
      document.removeEventListener("keydown", disableShortcuts);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleOptionSelect = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handleQuestionClick = (index) => setCurrentQuestion(index);

  const goToNext = () => currentQuestion < questions.length - 1 && setCurrentQuestion(currentQuestion + 1);
  const goToPrevious = () => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);

  const toggleReview = () => {
    setReviewFlags((prev) => ({
      ...prev,
      [currentQuestion]: !prev[currentQuestion],
    }));
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="exam-container">
      <div className="exam-header">
        <span>👩 Student: John Doe</span>
        <span>📝 Exam: Java Fundamentals</span>
        <span>⏱ Timer: {formatTime(timeLeft)}</span>
        <span>🆔 Exam ID: JF101</span>
      </div>

      <div className="exam-body">
        {/* Grid of questions */}
        <div className="question-grid">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`question-number 
                ${answers[index] ? "answered" : ""} 
                ${reviewFlags[index] ? "review" : ""}
                ${index === currentQuestion ? "active" : ""}`}
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* Question View */}
        <div className="question-panel">
          <h3>Q{currentQuestion + 1}: {currentQ.question}</h3>
          <div className="options">
            {Object.entries(currentQ.options).map(([key, value]) => (
              <label key={key}>
                <input
                  type="radio"
                  name={`option-${currentQuestion}`}
                  value={key}
                  checked={answers[currentQuestion] === key}
                  onChange={() => handleOptionSelect(key)}
                />
                {key}. {value}
              </label>
            ))}
          </div>

          <div className="nav-row">
            <button onClick={goToPrevious} disabled={currentQuestion === 0}>⬅️ Previous</button>
            <button onClick={goToNext} disabled={currentQuestion === questions.length - 1}>➡️ Next</button>
            <button onClick={toggleReview}> Mark for Review</button>
            <button className="submit-btn" onClick={handleSubmit}> Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeExam;
