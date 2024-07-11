const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.ownerRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    User.getUserByMail(email, async (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).send("User already exists.");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = { email, password: hashedPassword, role: "owner" };

      User.create(newUser, (err, results) => {
        if (err) throw err;
        res.send("Owner registered successfully.");
      });
    });
  } catch (err) {
    res.status(500).send("Server error.");
  }
};

exports.userRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    User.getUserByMail(email, async (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).send("User already exists.");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = { email, password: hashedPassword, role: "user" };

      User.create(newUser, (err, results) => {
        if (err) throw err;
        res.send("User registered successfully.");
      });
    });
  } catch (err) {
    res.status(500).send("Server error.");
  }
};

exports.waiterRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    User.getUserByMail(email, async (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).send("User already exists.");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = { email, password: hashedPassword, role: "waiter" };

      User.create(newUser, (err, results) => {
        if (err) throw err;
        res.send("Waiter registered successfully.");
      });
    });
  } catch (err) {
    res.status(500).send("Server error.");
  }
};
