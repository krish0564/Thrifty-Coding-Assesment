const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("../models/messageModel");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5001",
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  socket.on("join", ({ userId, userName }) => {
    console.log(` ${userName} (${userId}) joined`);
  });

  socket.on("send_message", async (message) => {
    try {
      const newMessage = new Message(message);
      const saved = await newMessage.save();

      io.emit("receive_message", saved);

      setTimeout(async () => {
        const sentiment = analyzeSentiment(saved.text);

        await Message.findByIdAndUpdate(saved._id, { sentiment });

        io.emit("sentiment_updated", {
          messageId: saved._id.toString(),
          sentiment,
        });
      }, 3000);
    } catch (err) {
      console.error(" Error sending message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//  sentiment analysis
function analyzeSentiment(text) {
  const lower = text.toLowerCase();
  const pos = ["happy", "love", "great", "amazing"];
  const neg = ["sad", "angry", "bad", "hate"];
  const hasPos = pos.some((w) => lower.includes(w));
  const hasNeg = neg.some((w) => lower.includes(w));

  return hasPos && !hasNeg
    ? "positive"
    : hasNeg && !hasPos
    ? "negative"
    : "neutral";
}

module.exports = { app, server, io };
