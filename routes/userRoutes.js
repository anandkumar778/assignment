const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");

router.post("/", user.createUser);
router.get("/", user.getUsers);
router.get("/:id", user.getUser);
router.delete("/:id", user.deleteUser);

module.exports = router;