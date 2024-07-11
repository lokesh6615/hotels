const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.login = (req, res) => {
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
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.send({ token: token, role: user.role });
  });
};
