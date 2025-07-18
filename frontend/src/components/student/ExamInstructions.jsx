import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExamInstructions.css";

const ExamInstructions = () => {
  const navigate = useNavigate();

  const handleStartExam = () => {
    const confirmStart = window.confirm("Are you sure you want to start the exam?");
    if (confirmStart) {
      navigate("/student-dashboard/take-exam");
    }
  };

  return (
    <div className="exam-container">
      <h2>Exam Instructions</h2>
      <ul>
        <li>Read all questions carefully before answering.</li>
        <li>Do not refresh or close the tab during the exam.</li>
        <li>Each question carries equal marks unless stated otherwise.</li>
        <li>Click "Start Exam" only when you're ready.</li>
      </ul>
      <button className="start-exam-btn" onClick={handleStartExam}>
        Start Exam
      </button>
    </div>
  );
};

export default ExamInstructions;
