import React, { useState } from 'react';
import './AddCourse.css';

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseHeadings, setCourseHeadings] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      title: courseTitle,
      headings: courseHeadings,
      description: courseDescription,
      price: coursePrice,
      thumbnail,
    };
    console.log('Course Data:', courseData);
  };

  return (
    <div className="add-course-container">
      <h2 className="form-heading">Add New Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label>Course Title</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Type here"
            required
          />
        </div>

        <div className="form-group">
          <label>Course Headings</label>
          <input
            type="text"
            value={courseHeadings}
            onChange={(e) => setCourseHeadings(e.target.value)}
            placeholder="Type here"
          />
        </div>

        <div className="form-group">
          <label>Course Description</label>
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            rows={4}
            placeholder="Type here"
          ></textarea>
        </div>

        <div className="form-group-inline">
          <div className="form-group">
            <label>Course Price</label>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Course Thumbnail</label>
            <input type="file" accept="image/*" onChange={handleThumbnailUpload} />
            {preview && (
              <img src={preview} alt="Course Thumbnail" className="thumbnail-preview" />
            )}
          </div>
        </div>

        <button type="submit" className="submit-button">ADD</button>
      </form>
    </div>
  );
};

export default AddCourse;
