const Post = require("../models/Post");
const mongoose = require("mongoose");

// Create Post
exports.createPost = async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
};

// Get Posts (Pagination + Sorting)
exports.getPosts = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(posts);
};

// Get Post by ID (Aggregation)
exports.getPostById = async (req, res) => {
  const id = req.params.id;

  const post = await Post.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
  ]);

  res.json(post[0]);
};

// // Update Post
// exports.updatePost = async (req, res) => {
//   const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(post);
// };

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      req.body,   // ✅ object hona chahiye
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating post" });
  }
};

// Search Posts
exports.searchPosts = async (req, res) => {
  const { keyword } = req.query;

  const posts = await Post.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } },
    ],
  });

  res.json(posts);
};

// Top 3 Users
exports.topUsers = async (req, res) => {
  const result = await Post.aggregate([
    {
      $group: {
        _id: "$user",
        totalPosts: { $sum: 1 },
      },
    },
    { $sort: { totalPosts: -1 } },
    { $limit: 3 },
  ]);

  res.json(result);
};