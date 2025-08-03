import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TakeExam.css";

const TakeExam = () => {
  const [codingProblems, setCodingProblems] = useState([]);
  const [mcqExams, setMcqExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const codingRes = await axios.get("http://localhost:5000/api/problems/published");
        setCodingProblems(codingRes.data);

        const mcqRes = await axios.get("http://localhost:5000/api/mcq-exams/published");
        setMcqExams(mcqRes.data);
      } catch (err) {
        console.error("Failed to fetch exams", err);
      }
    };

    fetchExams();
  }, []);

  const handleSolveCoding = (id) => {
    navigate(`/student-dashboard/solve/${id}`);
  };

  const handleTakeMcq = (id) => {
    navigate(`/student-dashboard/mcq-exam/${id}`);
  };

  return (
    <div className="take-exam-container">
      <div className="exam-card">
        <h2>Available Coding Exams</h2>
        {codingProblems.length === 0 ? (
          <p>No published coding exams available right now.</p>
        ) : (
          <ul className="problem-list">
            {codingProblems.map((problem) => (
              <li key={problem.problem_id} className="problem-item">
                <h4>{problem.question_text}</h4>
                <p>{problem.description?.slice(0, 150)}...</p>
                <button onClick={() => handleSolveCoding(problem.problem_id)}>Solve</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="exam-card">
        <h2>Available MCQ Exams</h2>
        {mcqExams.length === 0 ? (
          <p>No published MCQ exams available right now.</p>
        ) : (
          <ul className="exam-list">
            {mcqExams.map((exam) => (
              <li key={exam.exam_id} className="exam-item">
                <h4>{exam.exam_title}</h4>
                <p>{exam.description?.slice(0, 150)}...</p>
                <button onClick={() => handleTakeMcq(exam.exam_id)}>Take Exam</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TakeExam;
