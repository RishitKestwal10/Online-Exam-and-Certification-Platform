const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const examRoutes = require("./routes/exam");
const problemsRoutes = require("./routes/problem");
const submissionsRoutes = require("./routes/submission");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Database connection
const db = require("./utils/db");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Inject DB into every request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use("/api/exams", examRoutes);
app.use("/api/problems", problemsRoutes);
app.use("/api/submissions", submissionsRoutes);

// Registration Route
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const plainPassword = password;
  const role = "admin";  // Default role set to admin (teacher)

  db.query(
    "INSERT INTO User (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, plainPassword, role],
    (err) => {
      if (err) return res.status(500).json({ message: "Registration failed." });
      res.send("Registered successfully.");
    }
  );
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  db.query("SELECT * FROM User WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = results[0];

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // ✅ Correct key name: student_id (not userId)
    res.json({ role: user.role, name: user.name, student_id: user.user_id });
  });
});

// Catch-all route for unmatched paths
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
