import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MCQForm.css";

const MCQForm = () => {
  const location = useLocation();
  const course = location.state?.course || "Unknown Course";
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({
    A: "",
    B: "",
    C: "",
    D: ""
  });
  const [answer, setAnswer] = useState("A"); // default to first

  const handleOptionChange = (label, value) => {
    setOptions((prev) => ({
      ...prev,
      [label]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   const questionData = {
  question,
  options,
  correctOption: answer,
  course
};


    console.log("Question added:", questionData);

    // Clear form
  
    setQuestion("");
    setOptions({ A: "", B: "", C: "", D: "" });
    setAnswer("A");
  };

  return (
    <div className="mcq-form-container">
      <h2>Add Questions for {course}</h2>
      <form className="mcq-form" onSubmit={handleSubmit}>
    
        <input
          type="text"
          placeholder="Please Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        {["A", "B", "C", "D"].map((label) => (
          <div className="option-row" key={label}>
            <input
              type="radio"
              name="correctOption"
              value={label}
              checked={answer === label}
              onChange={() => setAnswer(label)}
            />
            <input
              type="text"
              placeholder={`Option ${label}`}
              value={options[label]}
              onChange={(e) => handleOptionChange(label, e.target.value)}
              required
              style={{ marginLeft: "10px", flex: 1 }}
            />
          </div>
        ))}

        <div className="button-row">
          <button type="submit" className="mcq-button blue-button">
            Add Question
          </button>
          <button
            type="button"
            className="mcq-button red-button"
            onClick={() => {
              alert("Questions added successfully");
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
