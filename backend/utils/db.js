
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Mj@626254",
  database: process.env.DB_NAME || "project"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to DB:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;
