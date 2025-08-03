const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();

router.post("/", async (req, res) => {
  const { student_id, problem_id, code, language_id } = req.body;

  if (!student_id || !problem_id || !code || !language_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const examQuery = "SELECT exam_id FROM Coding_Problem WHERE problem_id = ?";
    req.db.query(examQuery, [problem_id], async (err, result) => {
      if (err || result.length === 0) {
        return res.status(500).json({ message: "❌ Could not find related exam." });
      }

      const exam_id = result[0].exam_id;

      try {
        const judgeRes = await axios.post(
          "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
          { source_code: code, language_id },
          {
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        const { status } = judgeRes.data;
        const score = status?.id === 3 ? 100 : 0;

        const query = `
          INSERT INTO Exam_Submission 
            (exam_id, problem_id, student_id, submission_time, code_submission, score)
          VALUES (?, ?, ?, NOW(), ?, ?)
          ON DUPLICATE KEY UPDATE
            submission_time = NOW(),
            code_submission = VALUES(code_submission),
            score = VALUES(score)
        `;

        req.db.query(query, [exam_id, problem_id, student_id, code, score], (err2) => {
          if (err2) return res.status(500).json({ message: "❌ Failed to save submission." });
          res.json({ message: "✅ Code submitted", score, status });
        });

      } catch (judgeErr) {
        return res.status(500).json({ message: "❌ Judge0 API request failed" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Internal Error" });
  }
});

module.exports = router;
