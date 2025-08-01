import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TakeExam.css";

const TakeExam = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/problems/published");
        setProblems(res.data);
      } catch (err) {
        console.error("Failed to fetch problems", err);
      }
    };

    fetchProblems();
  }, []);

  const handleSolve = (id) => {
    navigate(`/student-dashboard/solve/${id}`);
  };

  return (
    <div className="take-exam-container">
      <h2>Available Coding Exams</h2>
      {problems.length === 0 ? (
        <p>No published exams available right now.</p>
      ) : (
        <ul className="problem-list">
          {problems.map((problem) => (
            <li key={problem.problem_id} className="problem-item">
              <h4>{problem.question_text}</h4>
              <p>{problem.description?.slice(0, 150)}...</p>
              <button onClick={() => handleSolve(problem.problem_id)}>Solve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TakeExam;
