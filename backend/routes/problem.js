const express = require("express");
const router = express.Router();

// GET /api/problems - Fetch all problems
router.get("/", (req, res) => {
  const query = "SELECT * FROM Coding_Problem";
  req.db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    const parsedResults = results.map((q) => ({
      ...q,
      test_cases: typeof q.test_cases === "string" ? JSON.parse(q.test_cases) : q.test_cases,
    }));

    res.json(parsedResults);
  });
});

// POST /api/problems/add - Add new coding problem
router.post("/add", (req, res) => {
  const { exam_id, question_text, description, input_format, output_format, test_cases } = req.body;

  if (!exam_id || !question_text || !description || !input_format || !output_format || !test_cases) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const testCasesString = JSON.stringify(test_cases);

  const query = `
    INSERT INTO Coding_Problem (
      exam_id, question_text, description, input_format,
      output_format, test_cases, is_published
    ) VALUES (?, ?, ?, ?, ?, ?, FALSE)
  `;

  req.db.query(
    query,
    [exam_id, question_text, description, input_format, output_format, testCasesString],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.status(201).json({ message: "✅ Problem added", id: result.insertId });
    }
  );
});

// PUT /api/problems/publish/:id
router.put("/publish/:id", (req, res) => {
  const { id } = req.params;
  const { exam_duration_minutes } = req.body;

  if (!exam_duration_minutes || exam_duration_minutes <= 0) {
    return res.status(400).json({ message: "Valid exam duration required" });
  }

  const publishQuery = `
    UPDATE Coding_Problem
    SET is_published = TRUE, exam_duration_minutes = ?
    WHERE problem_id = ?
  `;

  req.db.query(publishQuery, [exam_duration_minutes, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Problem not found" });

    // 🧹 Clear previous submissions for this problem
    const deleteQuery = `DELETE FROM Exam_Submission WHERE problem_id = ?`;
    req.db.query(deleteQuery, [id], (delErr) => {
      if (delErr) {
        console.error("❌ Failed to clear old submissions:", delErr);
        return res.status(500).json({ message: "Published, but failed to clear old submissions" });
      }

      res.json({ message: "✅ Problem published and old submissions cleared", exam_duration_minutes });
    });
  });
});

// PUT /api/problems/unpublish/:id
router.put("/unpublish/:id", (req, res) => {
  const id = req.params.id;

  const query = `
    UPDATE Coding_Problem
    SET is_published = FALSE
    WHERE problem_id = ?
  `;

  req.db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Problem not found" });

    res.json({ message: "✅ Problem unpublished" });
  });
});

// GET /api/problems/published-with-status/:student_id
router.get("/published-with-status/:student_id", (req, res) => {
  const studentId = req.params.student_id;

  const query = `
    SELECT cp.*, 
      (es.problem_id IS NOT NULL) AS submitted
    FROM Coding_Problem cp
    LEFT JOIN Exam_Submission es 
      ON cp.problem_id = es.problem_id AND es.student_id = ?
    WHERE cp.is_published = TRUE
  `;

  req.db.query(query, [studentId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    const parsed = results.map((q) => ({
      ...q,
      test_cases: typeof q.test_cases === "string" ? JSON.parse(q.test_cases) : q.test_cases,
      submitted: Boolean(q.submitted)
    }));

    res.json(parsed);
  });
});

// GET /api/problems/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Coding_Problem WHERE problem_id = ?";
  req.db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Problem not found" });

    const problem = results[0];
    if (typeof problem.test_cases === "string") {
      problem.test_cases = JSON.parse(problem.test_cases);
    }
    res.json(problem);
  });
});

module.exports = router;
