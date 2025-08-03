import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProblemEditor.css';

function ProblemEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [languageId, setLanguageId] = useState(71);
  const [customInput, setCustomInput] = useState('');
  const [remainingTime, setRemainingTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [customOutput, setCustomOutput] = useState('');
  const [testCaseOutput, setTestCaseOutput] = useState('');
  const [testResult, setTestResult] = useState('');

  const judgeApiKey = process.env.REACT_APP_RAPIDAPI_KEY;

  const templates = {
    71: `# Python 3\na, b = map(int, input().split())\nprint(a + b)`,
    62: `// Java\nimport java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    System.out.println(a + b);\n  }\n}`,
    54: `// C++\n#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b;\n  return 0;\n}`
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/problems/${id}`)
      .then((res) => {
        setProblem(res.data);
        const duration = res.data.exam_duration_minutes || 60;
        startTimer(duration);
        setCode(templates[languageId] || "");
      })
      .catch(() => alert("❌ Failed to load problem"));
  }, [id]);

  const startTimer = (durationMinutes) => {
    const totalTime = durationMinutes * 60;
    setRemainingTime(totalTime);

    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAutoSubmit = () => {
    if (submitted) return;
    setTestResult("⏰ Time's up. Auto-submitting.");
    submitCode(true);
  };

  const submitCode = async (auto = false) => {
    if (submitted) return;
    setSubmitted(true);

    try {
      const studentId = localStorage.getItem("student_id");
      if (!studentId) {
        setTestResult("❌ Student ID not found. Please login.");
        return;
      }

      await axios.post("http://localhost:5000/api/submissions", {
        student_id: parseInt(studentId),
        problem_id: parseInt(id),
        code,
        language_id: languageId
      });

      setTestResult(auto ? "✅ Auto-submitted!" : "✅ Submitted!");

      // ✅ Navigate with justSubmitted state
      navigate('/student-dashboard/take-exam', { state: { justSubmitted: parseInt(id) } });
    } catch (err) {
      console.error("❌ Submission failed:", err.response?.data || err.message);
      setTestResult("❌ Submission error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleRunCustom = async () => {
    setCustomOutput('');
    setTestResult('');
    try {
      const encodedCode = btoa(code);
      const encodedInput = btoa(customInput);

      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
        {
          source_code: encodedCode,
          language_id: languageId,
          stdin: encodedInput
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": judgeApiKey,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
          }
        }
      );

      const decodedOutput = atob(response.data.stdout || "").trim();
      setCustomOutput(decodedOutput || "No output");

    } catch (err) {
      console.error("❌ Custom Run failed", err);
      setCustomOutput("❌ Judge0 API failed.");
    }
  };

  const handleRunTestCases = async () => {
    if (!problem?.test_cases || problem.test_cases.length === 0) {
      setTestResult("⚠ No test cases available.");
      return;
    }

    setTestCaseOutput('');
    setTestResult("Running test cases...");
    setCanSubmit(false);

    let passed = 0;
    const total = problem.test_cases.length;
    let allOutputs = "";

    for (let i = 0; i < total; i++) {
      const tc = problem.test_cases[i];
      const encodedCode = btoa(code);
      const encodedInput = btoa(tc.input.trim());

      try {
        const response = await axios.post(
          "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
          {
            source_code: encodedCode,
            language_id: languageId,
            stdin: encodedInput
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": judgeApiKey,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
            }
          }
        );

        const decodedOutput = atob(response.data.stdout || "").trim();
        const expectedOutput = tc.output.trim();
        allOutputs += `Test Case ${i + 1}:\nInput: ${tc.input}\nExpected: ${expectedOutput}\nGot: ${decodedOutput}\n\n`;

        if (decodedOutput === expectedOutput) {
          passed++;
        } else {
          setTestResult(`❌ Failed Test Case ${i + 1}`);
          setTestCaseOutput(allOutputs);
          setCanSubmit(false);
          return;
        }

      } catch (err) {
        console.error(`❌ Error in test case ${i + 1}`, err);
        setTestResult(`❌ Judge0 API error on test case ${i + 1}`);
        setTestCaseOutput(allOutputs);
        return;
      }
    }

    if (passed === total) {
      setCanSubmit(true);
      setTestResult(`✅ All ${total} test cases passed. Full marks awarded.`);
    }

    setTestCaseOutput(allOutputs);
  };

  const minutes = Math.floor((remainingTime || 0) / 60);
  const seconds = (remainingTime || 0) % 60;

  return (
    <div className="editor-container">
      {problem ? (
        <>
          <div className="question-panel">
            <h2>{problem.question_text}</h2>
            <p>{problem.description}</p>
            <p><strong>Input Format:</strong> {problem.input_format}</p>
            <p><strong>Output Format:</strong> {problem.output_format}</p>

            {problem.test_cases && problem.test_cases.length > 0 && (
              <div className="test-cases">
                <h4>Sample Test Cases:</h4>
                <ul>
                  {problem.test_cases.map((tc, idx) => (
                    <li key={idx}>
                      <div><strong>Input:</strong> {tc.input}</div>
                      <div><strong>Output:</strong> {tc.output}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="editor-panel">
            <h3>Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={12}
              placeholder="Write your code..."
            />

            <label>Language:
              <select
                value={languageId}
                onChange={(e) => {
                  const newLang = Number(e.target.value);
                  setLanguageId(newLang);
                  setCode(templates[newLang] || "");
                }}
              >
                <option value={71}>Python 3</option>
                <option value={62}>Java</option>
                <option value={54}>C++</option>
              </select>
            </label>

            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              rows={3}
              placeholder="Custom Input"
            />

            <div style={{ marginTop: '10px' }}>
              <button onClick={handleRunCustom}>Run Custom Input</button>
              <button onClick={handleRunTestCases}>Run Test Cases</button>
              <button onClick={() => submitCode(false)} disabled={!canSubmit}>Submit</button>
            </div>

            {customOutput && (
              <div className="output-box">
                <h4>Custom Output:</h4>
                <pre>{customOutput}</pre>
              </div>
            )}

            {testCaseOutput && (
              <div className="output-box">
                <h4>Test Case Results:</h4>
                <pre>{testCaseOutput}</pre>
              </div>
            )}

            {testResult && (
              <div className="test-result" style={{ marginTop: '10px', color: testResult.startsWith("✅") ? "green" : "red" }}>
                <pre>{testResult}</pre>
              </div>
            )}
          </div>
        </>
      ) : <p>Loading problem...</p>}
    </div>
  );
}

export default ProblemEditor;
