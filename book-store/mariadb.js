const mysql = require("mysql2/promise");

const dbPool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "bookStore",
  // 날짜 결과가 string으로 YYYY-MM-DD HH:MM:SS으로 나오게됨.
  dateStrings: true,
});

module.exports = dbPool;
