import React, { useEffect, useState } from "react";
import "./TeacherResults.css";

const TeacherResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Sample dummy data
    const dummyData = [
      {
        exam_name: "Java Basics",
        student_name: "Anjali",
        score: 8.5,
        submission_time: "2025-06-24T10:15:00Z",
      },
      {
        exam_name: "Python MCQ",
        student_name: "Ravi",
        score: 7.0,
        submission_time: "2025-06-23T16:30:00Z",
      },
    ];
    setResults(dummyData);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="results-page" role="region" aria-label="Exam results table">
      <h2>Exam Results</h2>
      {results.length === 0 ? (
        <p>No exam results available.</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th scope="col">Exam Name</th>
              <th scope="col">Student Name</th>
              <th scope="col">Score</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.exam_name}</td>
                <td>{r.student_name}</td>
                <td>{r.score}</td>
                <td>{formatDate(r.submission_time)}</td>
                <td>{formatTime(r.submission_time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherResults;
