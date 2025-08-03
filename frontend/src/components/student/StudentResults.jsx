import React from "react";
import "./StudentResults.css";
import { useNavigate } from "react-router-dom";

const StudentResults = () => {
  const navigate = useNavigate();

  // Replace with real results from backend
  const results = [
    { subject: "Java", marks: 85, status: "Pass", examId: 1 },
    { subject: "Spring Boot", marks: 65, status: "Pass", examId: 2 },
    { subject: "ReactJS", marks: 45, status: "Fail", examId: 3 },
  ];

  const studentId = 1; // Replace with real logged-in student's ID

  const handleViewCertificate = (examId) => {
    // Navigate to the certificate page with studentId and examId
    navigate(`/certificate/${studentId}/${examId}`);
  };

  return (
    <div className="student-results">
      <h2>My Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Status</th>
            <th>Certificate</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.subject}</td>
              <td>{result.marks}</td>
              <td className={result.status === "Pass" ? "pass" : "fail"}>
                {result.status}
              </td>
              <td>
                {result.status === "Pass" ? (
                  <button
                    className="download-btn"
                    onClick={() => handleViewCertificate(result.examId)}
                  >
                    View Certificate
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentResults;
