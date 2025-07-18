import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MCQExamForm.css";

const MCQExamForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    examName: "",
    examCode: "",
    examDate: "",
    examTime: "",
    duration: "",
    totalMarks: "",
    passingMarks: "",
    numberOfQuestions: "",
    status: "draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam Form Data:", formData);
    navigate("/teacher-dashboard/mcq-form", {
      state: {
        course: formData.examName,
        examId: formData.examCode,
        totalQuestions: formData.numberOfQuestions,
      },
    });
  };

  const handleUploadClick = () => {
    alert("Upload feature coming soon!");
    // Future: open file dialog or redirect to upload page
  };

  return (
    <div className="exam-form-container">
      <h2>Create MCQ Exam</h2>
      <form onSubmit={handleSubmit}>
        <div><label>Exam Name:</label>
          <input type="text" name="examName" value={formData.examName} onChange={handleChange} required />
        </div>
        <div><label>Exam Code:</label>
          <input type="text" name="examCode" value={formData.examCode} onChange={handleChange} required />
        </div>
        <div><label>Exam Date:</label>
          <input type="date" name="examDate" value={formData.examDate} onChange={handleChange} required />
        </div>
        <div><label>Exam Time:</label>
          <input type="time" name="examTime" value={formData.examTime} onChange={handleChange} required />
        </div>
        <div><label>Duration (in minutes):</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
        </div>
        <div><label>Total Marks:</label>
          <input type="number" name="totalMarks" value={formData.totalMarks} onChange={handleChange} required />
        </div>
        <div><label>Passing Marks:</label>
          <input type="number" name="passingMarks" value={formData.passingMarks} onChange={handleChange} required />
        </div>
        <div><label>Number of Questions:</label>
          <input type="number" name="numberOfQuestions" value={formData.numberOfQuestions} onChange={handleChange} required />
        </div>
        <div><label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>

        {/* 🔁 Button Group */}
        <div className="button-group">
          <button type="button" className="upload-btn" onClick={handleUploadClick}>
            Upload Questions File
          </button>
          <button type="submit" className="primary-btn">
            Save and Add Questions
          </button>
        </div>
      </form>
    </div>
  );
};

export default MCQExamForm;
