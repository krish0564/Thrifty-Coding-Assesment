const express = require("express");
const bodyParser = require("body-parser");
const connectMongoDB = require("./database/connectMongo");
const activityRoutes = require("./Routes/activityRoutes");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/activities", activityRoutes);

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB and start server
connectMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} `);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });

module.exports = app;
