const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers.js");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = { messageRouter: router };
