import React, { useState } from 'react';
import axios from 'axios';
import './CodingForm.css'; // optional CSS

function CodingForm() {
  const [title, setTitle] = useState('');
  const [inputFormat, setInputFormat] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [testCases, setTestCases] = useState('');

  const handleSubmit = async () => {
    if (!title || !inputFormat || !outputFormat || !testCases) {
      alert('Please fill all fields.');
      return;
    }

    const formattedTestCases = testCases
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const parts = line.split('|');
        const input = parts[0]?.replace(/^input:\s*/i, '').trim();
        const output = parts[1]?.replace(/^output:\s*/i, '').trim();
        return { input, output };
      });

    const payload = {
      exam_id: 1, // Change this if you use dynamic exam IDs
      question_text: title,
      input_format: inputFormat,
      output_format: outputFormat,
      test_cases: formattedTestCases
    };

    try {
      await axios.post('http://localhost:5000/api/problem/add', payload);
      alert('✅ Problem added!');
      setTitle('');
      setInputFormat('');
      setOutputFormat('');
      setTestCases('');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add problem');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Add New Coding Problem</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Input Format"
        value={inputFormat}
        onChange={(e) => setInputFormat(e.target.value)}
      />
      <input
        placeholder="Output Format"
        value={outputFormat}
        onChange={(e) => setOutputFormat(e.target.value)}
      />
      <textarea
        placeholder="Test Cases (e.g. input: 2 3 | output: 5)"
        value={testCases}
        onChange={(e) => setTestCases(e.target.value)}
        rows={5}
      />
      <button onClick={handleSubmit}>Add Problem</button>
    </div>
  );
}

export default CodingForm;
