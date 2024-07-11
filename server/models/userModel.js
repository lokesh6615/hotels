const db = require("../config/db");

const User = {
  create: (user, callback) => {
    const createUser = "INSERT INTO users SET ?";
    db.query(createUser, user, callback);
  },
  getUserByMail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  },
  getUserById: (id, callback) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = User;
