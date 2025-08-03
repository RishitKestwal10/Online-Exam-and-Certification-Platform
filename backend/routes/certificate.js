const express = require("express");
const router = express.Router();

// GET /api/certificate/:studentId/:examId
router.get("/:studentId/:examId", (req, res) => {
  const { studentId, examId } = req.params;

  const query = `
    SELECT u.name AS studentName, e.title AS examName, e.exam_id AS examId
    FROM User u
    JOIN Exam_Submission es ON u.user_id = es.student_id
    JOIN Exam e ON e.exam_id = es.exam_id
    WHERE u.user_id = ? AND e.exam_id = ?;
  `;

  req.db.query(query, [studentId, examId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Result not found" });

    const { studentName, examName, examId } = results[0];
    res.json({ studentName, examName, examId });
  });
});

module.exports = router;
