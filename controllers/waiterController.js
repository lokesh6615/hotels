const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.waiterLogin = (req, res) => {
  const { email, password } = req.body;

  User.getUserByMail(email, async (err, results) => {
    if (err) throw err;

    if (results.length === 0)
      return res.status(400).send("Invalid email or password.");

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = jwt.sign(
      { id: user.id, role: "waiter" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.send({ token });
  });
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
