const express = require("express");
const router = express.Router();

// GET /api/problems
// Fetch all coding problems
router.get("/", (req, res) => {
  req.db.query("SELECT * FROM Coding_Problem", (err, results) => {
    if (err) {
      console.error("❌ MySQL Select Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const parsedResults = results.map((q) => ({
      ...q,
      test_cases: typeof q.test_cases === "string"
        ? JSON.parse(q.test_cases)
        : q.test_cases,
    }));

    res.json(parsedResults);
  });
});

// POST /api/problems/add
// Add a new coding problem (is_published defaults to false)
router.post("/add", (req, res) => {
  const {
    exam_id,
    question_text,
    description,
    input_format,
    output_format,
    test_cases,
  } = req.body;

  console.log("Received data:", req.body);

  if (
    !exam_id ||
    !question_text ||
    !description ||
    !input_format ||
    !output_format ||
    !test_cases
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const testCasesString = JSON.stringify(test_cases);

  const query = `
    INSERT INTO Coding_Problem (
      exam_id,
      question_text,
      description,
      input_format,
      output_format,
      test_cases,
      is_published
    ) VALUES (?, ?, ?, ?, ?, ?, FALSE)
  `;

  req.db.query(
    query,
    [
      exam_id,
      question_text,
      description,
      input_format,
      output_format,
      testCasesString,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ MySQL Insert Error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res
        .status(201)
        .json({ message: "✅ Problem added", id: result.insertId });
    }
  );
});

// PUT /api/problems/publish/:id
// Publish a problem to be visible on the student dashboard
router.put("/publish/:id", (req, res) => {
  const problemId = req.params.id;

  const query = "UPDATE Coding_Problem SET is_published = TRUE WHERE problem_id = ?";

  req.db.query(query, [problemId], (err, result) => {
    if (err) {
      console.error("❌ MySQL Publish Error:", err);
      return res.status(500).json({ message: "Failed to publish problem" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json({ message: "✅ Problem published successfully!" });
  });
});

// GET /api/problems/published
router.get("/published", (req, res) => {
  const query = "SELECT * FROM Coding_Problem WHERE is_published = TRUE";

  req.db.query(query, (err, results) => {
    if (err) {
      console.error("❌ MySQL Select Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const parsedResults = results.map((q) => ({
      ...q,
      test_cases: typeof q.test_cases === "string"
        ? JSON.parse(q.test_cases)
        : q.test_cases,
    }));

    res.json(parsedResults);
  });
});

router.get("/:id", (req, res) => {
  const problemId = req.params.id;
  req.db.query(
    "SELECT * FROM Coding_Problem WHERE problem_id = ?",
    [problemId],
    (err, results) => {
      if (err) {
        console.error("Error fetching problem by ID:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Problem not found" });
      }
      const problem = results[0];
      problem.test_cases = typeof problem.test_cases === "string"
        ? JSON.parse(problem.test_cases)
        : problem.test_cases;
      res.json(problem);
    }
  );
});


module.exports = router;
