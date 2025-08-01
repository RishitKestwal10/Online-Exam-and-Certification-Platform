// exam.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT exam_id, title FROM Exam ORDER BY exam_id ASC";
  req.db.query(query, (err, results) => {
    if (err) {
      console.error("❌ MySQL Select Error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
