const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rishit@123", // update this if needed
  database: "project",
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const plainPassword = password;
  const role = "admin"; // default role

  db.query(
    "INSERT INTO User (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, plainPassword, role],
    (err) => {
      if (err) return res.status(500).json({ message: "Registration failed." });
      res.send("Registered successfully.");
    }
  );
});

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

    res.json({ role: user.role });
  });
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
