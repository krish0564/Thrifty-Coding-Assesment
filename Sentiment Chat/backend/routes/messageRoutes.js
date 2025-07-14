const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/", messageController.createMessage);
router.get("/", messageController.getMessages);
router.patch("/:id", messageController.updateMessageSentiment);
module.exports = router;
