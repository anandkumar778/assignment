const mongoose = require("mongoose");
const Comment = require("../models/Comment");

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const comments = await Comment.find({
      post: new mongoose.Types.ObjectId(postId)
    })
      .populate("user", "name email")
      .populate("post", "title")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};