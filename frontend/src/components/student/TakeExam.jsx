import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./TakeExam.css";

const TakeExam = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allSubmitted, setAllSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const justSubmittedId = location.state?.justSubmitted;

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const studentId = localStorage.getItem("student_id");
        if (!studentId) {
          setError("Student ID not found. Please login.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/problems/published-with-status/${studentId}`);
        const fetchedProblems = res.data;

        // ✅ Update just submitted problem as submitted
        const updatedProblems = fetchedProblems.map(p => ({
          ...p,
          submitted: p.submitted || p.problem_id === justSubmittedId
        }));
        setProblems(updatedProblems);

        const allSubmittedStatus = updatedProblems.length > 0 && updatedProblems.every(p => p.submitted);
        setAllSubmitted(allSubmittedStatus);
      } catch (err) {
        console.error("❌ Failed to fetch problems", err);
        setError("Failed to load problems.");
      }
      setLoading(false);
    };

    fetchProblems();
  }, [justSubmittedId]);

  const handleSolve = (id) => {
    navigate(`/student-dashboard/solve/${id}`);
  };

  const handleDashboardRedirect = () => {
    navigate("/student-dashboard");
  };

  return (
    <div className="take-exam-container">
      <h2>Available Coding Problems</h2>

      {loading ? (
        <p>Loading problems...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : problems.length > 0 ? (
        <>
          <ul className="problem-list">
            {problems.map((p) => (
              <li key={p.problem_id} className="problem-item">
                <h4>{p.question_text}</h4>
                <p>{p.description ? p.description.slice(0, 100) + "..." : "No description"}</p>
                
                {p.submitted ? (
                  <span className="submitted-tag">Submitted</span>
                ) : (
                  <button onClick={() => handleSolve(p.problem_id)}>Solve</button>
                )}
              </li>
            ))}
          </ul>

          {allSubmitted && (
            <div className="all-submitted">
              <p>All problems submitted!</p>
              <button onClick={handleDashboardRedirect}>Go to Dashboard</button>
            </div>
          )}
        </>
      ) : (
        <p>No available problems right now.</p>
      )}
    </div>
  );
};

export default TakeExam;
