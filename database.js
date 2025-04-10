const mysql2 = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();

const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
  console.log("db connected!");
});

module.exports = db;