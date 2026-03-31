const express = require("express");
const router = express.Router();

const {
  getCommentsByPost, createComment
} = require("../controllers/commentController");

// GET by postId
router.get("/postId", getCommentsByPost);

router.post("/comment", createComment);    

module.exports = router;