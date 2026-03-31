const mongoose = require("mongoose");
const Comment = require("../models/Comment");

// ➤ Create Comment (IMPORTANT)
exports.createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId" });
    }

    const comment = await Comment.create({
      text,
      user: new mongoose.Types.ObjectId(_id), // dummy user
      post: new mongoose.Types.ObjectId(postId),
    });

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➤ Get Comments by PostId
exports.getCommentsByPost = async (req, res) => {
  try {
    let { postId } = req.params;
   

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId" });
    }

    postId = new mongoose.Types.ObjectId(postId);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const comments = await Comment.find({ post: postId })
    
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("post", "_id");    

    const total = await Comment.countDocuments({ post: postId });

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      comments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};