import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Certificate.css";

const generateCertificateId = () => {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `CERT-${date}-${rand}`;
};

const Certificate = ({ studentId, examId }) => {
  const [result, setResult] = useState(null);
  const [certificateId, setCertificateId] = useState(generateCertificateId());
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    setDate(today.toLocaleDateString('en-GB', options));

    axios.get(`http://localhost:5000/api/certificate/${studentId}/${examId}`)
      .then(res => setResult(res.data))
      .catch(err => console.error("Error:", err));
  }, [studentId, examId]);

  if (!result) return <div>Loading certificate...</div>;

  return (
    <div className="certificate-container">
      <div className="certificate-header">
        <img src="/Examify.png" alt="Logo" className="certificate-logo" />
        <h1 className="certificate-title">CERTIFICATE OF ACHIEVEMENT</h1>
      </div>

      <div className="certificate-body">
        <div className="certificate-text">This is to certify that</div>
        <div className="certificate-student">{result.studentName}</div>
        <div className="certificate-text">
          has successfully completed the examination
        </div>
        <div className="certificate-exam">{result.examName}</div>
        <div className="certificate-info">
          <span>Exam ID: {result.examId}</span>
          <span>Date: {date}</span>
          <span>Certificate: {certificateId}</span>
        </div>
      </div>

      <div className="certificate-signature">
        <img src="/signature.png" alt="Signature" style={{ height: 85, marginRight: 35 }} />
        <div className="signature-line" />
        <div className="signature-name">Dr. K. Sharma</div>
        <div className="signature-label">Authorized Signature</div>
      </div>
    </div>
  );
};

export default Certificate;
