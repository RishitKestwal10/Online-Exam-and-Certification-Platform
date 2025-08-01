import React, { forwardRef } from "react";
import "./Certificate.css";

const Certificate = forwardRef(({ studentName, examName, examCode }, ref) => {
  return (
    <div className="certificate" ref={ref}>
      <img
        src="/Examplus.png"
        alt="ExamPlus Logo"
        className="certificate-logo"
      />
      <h1 className="certificate-title">Certificate of Achievement</h1>
      <p className="certificate-text">This is to certify that</p>
      <h2 className="certificate-name">{studentName}</h2>
      <p className="certificate-text">has successfully completed the exam</p>
      <h2 className="certificate-exam">{examName}</h2>
      <p className="certificate-text">
        Exam Code: <strong>{examCode}</strong>
      </p>
      <div className="certificate-signature-box">
        <img
          src="/signature.png"
          alt="Digital Signature"
          className="certificate-signature-img"
        />
        <p>Authorized Signature</p>
      </div>
    </div>
  );
});

export default Certificate;
