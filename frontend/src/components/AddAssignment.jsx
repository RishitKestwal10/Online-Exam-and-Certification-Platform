import React, { useState } from 'react';
import './AddAssignment.css'; 

const AddAssignment = () => {
  const [title, setTitle] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Assignment Title:', title);
    console.log('Submission Date:', submissionDate);
    console.log('Selected File:', file);
    alert('Assignment submitted (frontend only)');
  };

  return (
    <div className="assignment-form-container">
      <h3 className="assignment-form-heading">Add New Assignment</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Assignment Title</label>
          <input
            type="text"
            placeholder="Type here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Submission Date</label>
          <input
            type="date"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="submit-btn">ADD</button>
      </form>
    </div>
  );
};

export default AddAssignment;
