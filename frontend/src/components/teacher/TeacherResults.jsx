import React, { useEffect, useState } from "react";
import "./TeacherResults.css";

const TeacherResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Sample dummy data for now
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

  return (
    <div className="results-page">
      <h2>Exam Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Student Name</th>
            <th>Score</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => {
            const submittedDate = new Date(r.submission_time);
            const dateOnly = submittedDate.toLocaleDateString();
            const timeOnly = submittedDate.toLocaleTimeString();

            return (
              <tr key={i}>
                <td>{r.exam_name}</td>
                <td>{r.student_name}</td>
                <td>{r.score}</td>
                <td>{dateOnly}</td>
                <td>{timeOnly}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherResults;
