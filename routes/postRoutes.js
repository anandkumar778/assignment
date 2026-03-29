const express = require("express");
const router = express.Router();
const post = require("../controllers/postController");

router.post("/", post.createPost);
router.get("/", post.getPosts);
router.get("/search", post.searchPosts);
router.get("/top-users", post.topUsers);
router.get("/:id", post.getPostById);
router.put("/:id", post.updatePost);

module.exports = router;