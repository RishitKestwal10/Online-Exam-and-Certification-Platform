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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/exams")
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
      console.log("Fetched problems:", res.data);
      setProblems(res.data);
    } catch (err) {
      console.error("Failed to fetch problems:", err);
      alert("❌ Failed to fetch problems");
    }
    setLoading(false);
  };

  const formatTestCases = () => {
    return testCases
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const parts = line.split("|");
        const input = parts[0]?.replace(/^input:\s*/i, "").trim();
        const output = parts[1]?.replace(/^output:\s*/i, "").trim();
        return { input, output };
      });
  };

  const handleSubmit = async () => {
    if (
      !selectedExamId ||
      !title ||
      !description ||
      !inputFormat ||
      !outputFormat ||
      !testCases
    ) {
      alert("❌ Please fill all fields and select an exam.");
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
      alert("✅ Problem added successfully!");
      setTitle("");
      setDescription("");
      setInputFormat("");
      setOutputFormat("");
      setTestCases("");
      setSelectedExamId("");
      fetchProblems();
    } catch (error) {
      console.error("❌ Failed to add problem:", error);
      alert("❌ Failed to add problem");
    }
  };

  const handlePublish = async (problemId) => {
    try {
      await axios.put(`http://localhost:5000/api/problems/publish/${problemId}`);
      alert("✅ Problem published to student dashboard!");
      fetchProblems();
    } catch (error) {
      console.error("❌ Failed to publish problem:", error);
      alert("❌ Failed to publish problem");
    }
  };

  return (
    <div className="admin-panel">
      <h2>Add New Coding Problem</h2>

      <label>
        Select Exam:
        <select
          value={selectedExamId}
          onChange={(e) => setSelectedExamId(e.target.value)}
        >
          <option value="">--Select Exam--</option>
          {exams.map((exam) => (
            <option key={exam.exam_id} value={exam.exam_id}>
              {exam.title}
            </option>
          ))}
        </select>
      </label>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
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

      <hr />

      <button onClick={() => setShowProblems(!showProblems)}>
        {showProblems ? "Hide" : "Show"} All Problems
      </button>

      {showProblems && (
        <div className="problem-list">
          <h3>Problem List</h3>

          {loading ? (
            <p>Loading problems...</p>
          ) : problems.length === 0 ? (
            <p>No coding problems found.</p>
          ) : (
            <ul>
              {problems.map((p) => (
                <li key={p.problem_id}>
                  <strong>{p.question_text}</strong> — {p.description || "No description"}{" "}
                  {p.is_published ? (
                    <span style={{ color: "green", marginLeft: "10px" }}>✔ Published</span>
                  ) : (
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => handlePublish(p.problem_id)}
                    >
                      Publish
                    </button>
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
