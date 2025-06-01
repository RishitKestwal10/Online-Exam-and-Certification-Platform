import React from 'react';
import { Link } from 'react-router-dom';
import './CreateExam.css';

const CreateExam = () => {
  return (
    <div className="create-exam">
      <h2>Create Exam</h2>
      <div className="exam-card-grid">
        {/* MCQ Exam Card */}
        <div className="exam-card">
          <img src="https://via.placeholder.com/400x180?text=MCQ+Exam" alt="MCQ Exam" />
          <div className="exam-card-body">
            <h3>MCQ Exam</h3>
            <p>Create and manage multiple-choice questions.</p>
            <Link to="/course-exam" className="btn">MCQ</Link>
          </div>
        </div>

        {/* Coding Exam Card */}
        <div className="exam-card">
          <img src="https://via.placeholder.com/400x180?text=Coding+Exam" alt="Coding Exam" />
          <div className="exam-card-body">
            <h3>Coding Exam</h3>
            <p>Design and evaluate coding challenges.</p>
            <Link to="/coding-exam" className="btn">Coding</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
