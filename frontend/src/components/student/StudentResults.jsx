import React from "react";
import "./StudentResults.css";

const StudentResults = () => {
  const results = [
    { subject: "Java", marks: 85, status: "Pass" },
    { subject: "Spring Boot", marks: 65, status: "Pass" },
    { subject: "ReactJS", marks: 45, status: "Fail" },
  ];

  const handleDownload = (subject) => {
    // Replace this logic with actual certificate generation/download
    alert(`Downloading certificate for ${subject}`);
    // Example: window.open(`/certificates/${subject}.pdf`, "_blank");
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
                    onClick={() => handleDownload(result.subject)}
                  >
                    Download
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
