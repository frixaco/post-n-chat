const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const candidateEmail = await User.findOne({ email });
    const candidateUsername = await User.findOne({ username });
    if (candidateEmail || candidateUsername) {
      return res.status(400).json({ msg: "User exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ msg: "User created!" });
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong in the server!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const candidate = await User.findOne({ username });
    if (!candidate) {
      return res.status(400).json({ msg: "User does not exists!" });
    }

    const isMatch = await bcrypt.compare(
      password.toString(),
      candidate.password
    );
    if (!isMatch) {
      return res.status(400).json({ msg: "Passwords did not match!" });
    }

    const date = new Date();
    const currTime = date.getTime() / 1000;
    const validUntil = currTime + 180;

    const token = jwt.sign({ userID: candidate.id }, process.env.jwtSecret, {
      expiresIn: 180,
    });

    res.cookie("token", token, { maxAge: 180000, httpOnly: true });
    res.json({
      username: candidate.username,
      email: candidate.email,
      validUntil,
    });
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong in the server!" });
  }
});

module.exports = router;
