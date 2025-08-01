import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProblemEditor.css';

function ProblemEditor() {
  const { id } = useParams(); // problem_id from URL
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [languageId, setLanguageId] = useState(71); // Python
  const [customInput, setCustomInput] = useState('');

  const templates = {
    71: '# Python 3\na, b = map(int, input().split())\nprint(a + b)',
    54: '// C++\n#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b;\n  return 0;\n}',
    62: '// Java\nimport java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    System.out.println(a + b);\n  }\n}',
    63: '// JavaScript\nconst readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\nlet input = [];\nrl.on("line", (line) => { input.push(line); }).on("close", () => {\n  const [a, b] = input[0].split(" ").map(Number);\n  console.log(a + b);\n});'
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/problems/${id}`)
      .then((res) => {
        setProblem(res.data);
        setCode(templates[languageId] || '');
      })
      .catch((err) => console.error('❌ Problem fetch failed:', err));
  }, [id, languageId]);

  const handleLanguageChange = (e) => {
    const id = Number(e.target.value);
    setLanguageId(id);
    setCode(templates[id] || '');
  };

  const runCode = async () => {
    if (!code.trim()) {
      setOutput("❗ Please write some code.");
      return;
    }

    const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
    if (!apiKey) {
      console.error("❌ Missing REACT_APP_RAPIDAPI_KEY in .env file");
      setOutput("❌ Missing API Key. Please set REACT_APP_RAPIDAPI_KEY.");
      return;
    }

    setOutput("⏳ Submitting...");

    try {
      const submission = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false',
        {
          source_code: code,
          language_id: languageId,
          stdin: customInput,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          }
        }
      );

      const token = submission.data.token;

      const checkResult = async () => {
        try {
          const res = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`, {
            headers: {
              'X-RapidAPI-Key': apiKey,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            }
          });

          const data = res.data;
          if (data.status.id <= 2) {
            setTimeout(checkResult, 1000);
          } else {
            let outputText = '';
            if (data.stdout) outputText = data.stdout;
            else if (data.stderr) outputText = '❌ Runtime Error:\n' + data.stderr;
            else if (data.compile_output) outputText = '❌ Compilation Error:\n' + data.compile_output;
            else outputText = '⚠️ Unknown error.';
            setOutput(outputText);
          }
        } catch (err) {
          console.error("❌ Error fetching result:", err);
          setOutput("❌ Failed to fetch result.");
        }
      };

      setTimeout(checkResult, 1500);
    } catch (err) {
      console.error("❌ Submission error:", err.response?.data || err.message);
      setOutput("❌ Failed to execute code.");
    }
  };

  const submitCode = async () => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) return alert("❗ Student not logged in.");

    try {
      const res = await axios.post("http://localhost:5000/api/submissions", {
        problem_id: id,
        student_id: studentId,
        code,
        language_id: languageId,
        output,
      });

      alert("✅ Submitted successfully!");
    } catch (err) {
      console.error("❌ Submit error:", err.response?.data || err.message);
      alert("❌ Failed to submit code.");
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="editor-split-wrapper">
      <div className="editor-left">
        <h2>{problem.question_text}</h2>
        <p>{problem.description}</p>
        <p><strong>Input Format:</strong> {problem.input_format}</p>
        <p><strong>Output Format:</strong> {problem.output_format}</p>
        <h4>Sample Test Cases:</h4>
        {Array.isArray(problem.test_cases) ? (
          problem.test_cases.map((tc, idx) => (
            <div key={idx} className="test-case">
              <strong>Input:</strong> {tc.input}<br />
              <strong>Expected:</strong> {tc.output}
            </div>
          ))
        ) : <p>No test cases provided</p>}
      </div>

      <div className="editor-right">
        <label>Language:</label>
        <select onChange={handleLanguageChange} value={languageId}>
          <option value="71">Python 3</option>
          <option value="54">C++</option>
          <option value="62">Java</option>
          <option value="63">JavaScript</option>
        </select>

        <label>Code:</label>
        <textarea rows="15" value={code} onChange={(e) => setCode(e.target.value)} />

        <label>Custom Input:</label>
        <textarea rows="3" value={customInput} onChange={(e) => setCustomInput(e.target.value)} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={runCode}>Run Code</button>
          <button onClick={submitCode}>Submit</button>
        </div>

        <div className="output-title">Output:</div>
        <pre className="output-box">{output}</pre>
      </div>
    </div>
  );
}

export default ProblemEditor;
