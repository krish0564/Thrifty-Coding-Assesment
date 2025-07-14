// models/messageModel.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  text: String,
  sentiment: {
    type: String,
    enum: ["positive", "negative", "neutral", "pending"],
    default: "pending",
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
