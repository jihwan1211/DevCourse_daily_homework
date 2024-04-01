const mysql = require("mysql2/promise");

// Create the connection to database
// const connection = await mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "youtube",
//   // 날짜 결과가 string으로 YYYY-MM-DD HH:MM:SS으로 나오게됨.
//   dateStrings: true,
// });

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "youtube",
  // 날짜 결과가 string으로 YYYY-MM-DD HH:MM:SS으로 나오게됨.
  dateStrings: true,
});

module.exports = dbPool;
