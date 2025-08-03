import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CodingForm.css";

function CodingForm() {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [testCases, setTestCases] = useState("");
  const [problems, setProblems] = useState([]);
  const [showProblems, setShowProblems] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publishDurations, setPublishDurations] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/exams")
      .then((res) => setExams(res.data))
      .catch(() => alert("❌ Failed to load exams"));
  }, []);

  useEffect(() => {
    if (showProblems) fetchProblems();
  }, [showProblems]);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/problems");
      setProblems(res.data);
    } catch {
      alert("❌ Failed to fetch problems");
    }
    setLoading(false);
  };

  const formatTestCases = () => {
    return testCases.split("\n").map(line => line.trim()).filter(Boolean).map(line => {
      const [inputPart, outputPart] = line.split("|");
      const input = inputPart?.replace(/^input:\s*/i, "").trim();
      const output = outputPart?.replace(/^output:\s*/i, "").trim();
      return { input, output };
    });
  };

  const handleSubmit = async () => {
    if (!selectedExamId || !title || !description || !inputFormat || !outputFormat || !testCases) {
      alert("❌ Fill all fields and select an exam.");
      return;
    }

    const payload = {
      exam_id: selectedExamId,
      question_text: title,
      description,
      input_format: inputFormat,
      output_format: outputFormat,
      test_cases: formatTestCases(),
    };

    try {
      await axios.post("http://localhost:5000/api/problems/add", payload);
      alert("✅ Problem added!");
      setTitle(""); setDescription(""); setInputFormat(""); setOutputFormat(""); setTestCases(""); setSelectedExamId("");
      fetchProblems();
    } catch {
      alert("❌ Failed to add problem");
    }
  };

  const handlePublish = async (problemId) => {
    const duration = publishDurations[problemId];
    if (!duration || duration <= 0) {
      alert("Enter a valid duration in minutes.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/problems/publish/${problemId}`, {
        exam_duration_minutes: duration
      });
      alert("✅ Published!");
      fetchProblems();
    } catch (err) {
      console.error("Publish failed", err);
      alert("❌ Publish failed");
    }
  };

  const handleUnpublish = async (problemId) => {
    try {
      await axios.put(`http://localhost:5000/api/problems/unpublish/${problemId}`);
      alert("✅ Unpublished!");
      fetchProblems();
    } catch {
      alert("❌ Unpublish failed");
    }
  };

  return (
    <div className="admin-panel">
      <h2>Add Coding Problem</h2>
      <label>Select Exam:
        <select value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)}>
          <option value="">--Select Exam--</option>
          {exams.map(exam => <option key={exam.exam_id} value={exam.exam_id}>{exam.title}</option>)}
        </select>
      </label>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      <input placeholder="Input Format" value={inputFormat} onChange={(e) => setInputFormat(e.target.value)} />
      <input placeholder="Output Format" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} />
      <textarea placeholder="Test Cases (input: 2 3 | output: 5)" value={testCases} onChange={(e) => setTestCases(e.target.value)} rows={5} />
      <button onClick={handleSubmit}>Add Problem</button>

      <hr />
      <button onClick={() => setShowProblems(!showProblems)}>{showProblems ? "Hide" : "Show"} Problems</button>
      {showProblems && (
        <div className="problem-list">
          <h3>All Problems</h3>
          {loading ? <p>Loading...</p> : (
            <ul>
              {problems.map(p => (
                <li key={p.problem_id}>
                  <strong>{p.question_text}</strong> — {p.description || "No description"}
                  {p.is_published ? (
                    <>
                      <span className="published-badge">✔ Published</span>
                      <button onClick={() => handleUnpublish(p.problem_id)}>Unpublish</button>
                    </>
                  ) : (
                    <>
                      <input
                        type="number"
                        placeholder="Duration (min)"
                        value={publishDurations[p.problem_id] || ""}
                        onChange={(e) => setPublishDurations({ ...publishDurations, [p.problem_id]: e.target.value })}
                      />
                      <button onClick={() => handlePublish(p.problem_id)}>Publish</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CodingForm;
