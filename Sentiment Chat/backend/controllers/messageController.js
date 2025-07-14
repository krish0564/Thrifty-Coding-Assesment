const Message = require("../models/messageModel");

exports.createMessage = async (req, res) => {
  try {
    const { userId, text, sentiment, timestamp } = req.body;

    if (!userId || !text) {
      return res.status(400).json({ message: "userId and text are required" });
    }

    const newMessage = new Message({
      userId,
      text,
      sentiment: sentiment || "pending",
      timestamp: timestamp || Date.now(),
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateMessageSentiment = async (req, res) => {
  try {
    const messageId = req.params.id;
    const { sentiment } = req.body;

    if (!sentiment) {
      return res.status(400).json({ error: "Sentiment is required" });
    }

    const updated = await Message.findByIdAndUpdate(
      messageId,
      { sentiment },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating message sentiment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
