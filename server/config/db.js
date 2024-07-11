const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.log("Error while connecting to database.", { Error: err });
    throw err;
  }
  console.log("connected to MYSQL dataabase. ");
});

module.exports = connection;
