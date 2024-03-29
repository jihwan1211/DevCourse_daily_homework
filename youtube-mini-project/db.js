const mysql = require("mysql2/promise");

async function main() {
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "youtube",
    // 날짜 결과가 string으로 YYYY-MM-DD HH:MM:SS으로 나오게됨.
    dateStrings: true,
  });

  // A simple SELECT query
  try {
    const [results, fields] = await connection.query("SELECT * FROM users");
    const { id, email, name, pwd, contact, created_at } = results[0];
    console.log(created_at);
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
}

main();

// Using placeholders
// try {
//   const [results] = await connection.query("SELECT * FROM `table` WHERE `name` = ? AND `age` > ?", ["Page", 45]);

//   console.log(results);
// } catch (err) {
//   console.log(err);
// }
