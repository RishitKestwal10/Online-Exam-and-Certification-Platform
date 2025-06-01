// src/components/CourseExam.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseExam.css';

const courses = [
  { name: 'Python', description: 'Create Python MCQ Exam.', icon: '🐍' },
  { name: 'Java', description: 'Create Java MCQ Exam.', icon: '☕' },
  { name: 'C', description: 'Create C MCQ Exam.', icon: '📘' },
  { name: 'C++', description: 'Create C++ MCQ Exam.', icon: '➕➕' },
];

const CourseExam = () => {
  const navigate = useNavigate();

  const handleStart = (courseName) => {
    navigate('/mcqform', { state: { course: courseName } });
  };

  return (
    <div className="course-exam-container">
      <h2>Select Course to Create MCQ Exam</h2>
      <div className="course-card-grid">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <div className="course-icon">{course.icon}</div>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <button
              className="start-btn"
              onClick={() => handleStart(course.name)}
            >
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseExam;
