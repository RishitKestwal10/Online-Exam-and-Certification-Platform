import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateExam.css";

const CreateExam = () => {
  const [showMCQOptions, setShowMCQOptions] = useState(false);

  const handleMCQClick = () => {
    setShowMCQOptions(!showMCQOptions);
  };

  return (
    <div className="create-exam">
      <h2>Create Exam</h2>

      {!showMCQOptions ? (
        <div className="exam-card-grid">
          {/* MCQ Exam Card */}
          <div className="exam-card">
            <img
              src="https://via.placeholder.com/400x180?text=MCQ+Exam"
              alt="MCQ Exam"
            />
            <div className="exam-card-body">
              <h3>MCQ Exam</h3>
              <p>Create and manage multiple-choice questions.</p>
              <button className="btn" onClick={handleMCQClick}>
                MCQ
              </button>
            </div>
          </div>

          {/* Coding Exam Card */}
          <div className="exam-card">
            <img
              src="https://via.placeholder.com/400x180?text=Coding+Exam"
              alt="Coding Exam"
            />
            <div className="exam-card-body">
              <h3>Coding Exam</h3>
              <p>Design and evaluate coding challenges.</p>
              <Link to="/coding-exam" className="btn">
                Coding
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="exam-card-grid">
          {/* New MCQ Exam Card */}
          <div className="exam-card">
            <img
              src="https://via.placeholder.com/400x180?text=New+MCQ+Exam"
              alt="New MCQ Exam"
            />
            <div className="exam-card-body">
              <h3>New MCQ Exam</h3>
              <p>Create a brand new MCQ exam.</p>
              <Link to="/mcq-exam-form" className="btn">
                Create New
              </Link>
            </div>
          </div>

          {/* Existing MCQ Exams Card */}
          <div className="exam-card">
            <img
              src="https://via.placeholder.com/400x180?text=Existing+MCQ+Exams"
              alt="Existing MCQ Exams"
            />
            <div className="exam-card-body">
              <h3>Existing Exams</h3>
              <p>View or edit existing MCQ exams.</p>
              <Link to="/existing-mcq-exams" className="btn">
                View Exams
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateExam;
