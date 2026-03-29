const express = require("express");
const router = express.Router();
const { getCommentsByPost } = require("../controllers/commentController");

router.get("/:postId", getCommentsByPost);

module.exports = router;