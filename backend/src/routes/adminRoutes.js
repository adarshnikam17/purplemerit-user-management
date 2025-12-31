const express = require("express");
const router = express.Router();

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Get all users
router.get("/users", authMiddleware, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Update user status
router.patch("/users/:id/status", authMiddleware, adminOnly, async (req, res) => {
  const { status } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).select("-password");

  res.json(user);
});

module.exports = router;
