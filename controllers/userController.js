const User = require("../models/User");

// Create User
exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

// Get Users (Pagination)
exports.getUsers = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(users);
};

// Get Single User
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// Delete User
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};