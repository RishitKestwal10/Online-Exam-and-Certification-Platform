// src/components/MCQForm.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MCQForm.css";

const MCQForm = () => {
  const location = useLocation();
  const course = location.state?.course || "Unknown Course";

  // Form state for controlled inputs
  const [questionId, setQuestionId] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: log the data, replace with your saving logic
    const questionData = {
      questionId,
      question,
      options: [option1, option2, option3, option4],
      answer,
      course,
    };

    console.log("Question added:", questionData);

    // Clear form after submission
    setQuestionId("");
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
  };

  return (
    <div className="mcq-form-container">
      <h2>Add Questions for {course}</h2>
      <form className="mcq-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Please Enter Question Id"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Please Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <div className="row">
          <input
            type="text"
            placeholder="Please Enter Option1"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Please Enter Option2"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            required
          />
        </div>
        <div className="row">
          <input
            type="text"
            placeholder="Please Enter Option3"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Please Enter Option4"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Please Enter Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <div className="button-row">
          <button type="submit" className="mcq-button blue-button">
            Add Question
          </button>
          <button
            type="button"
            className="mcq-button red-button"
            onClick={() => {
              alert("Another action button clicked");
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MCQForm;
