const express = require("express");

const authMiddleware = require("../Middleware/AuthMiddleware");
const { sendMessage, getMessages } = require("../Controller/messageController");
const router = express.Router();

router.route("/send/:id").post(authMiddleware, sendMessage);
router.route("/:id").get(authMiddleware, getMessages);
module.exports = router;
