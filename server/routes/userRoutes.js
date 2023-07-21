const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/login", async (req, res) => {
  // Check if body exists and contains necessary properties
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).send("Bad request, missing required parameters");
  }

  // Check if user exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send("Invalid username or password");
  }

  // Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid username or password");
  }

  // Create and assign a token
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send(token);
});

module.exports = router;
