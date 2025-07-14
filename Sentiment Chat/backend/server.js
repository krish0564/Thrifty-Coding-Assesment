const express = require("express");
const connectDB = require("./database/connectMongo");
require("dotenv").config();

const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const { app, server } = require("./socket/socket");

// Connect to MongoDB
connectDB();

app.use(express.json());

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
