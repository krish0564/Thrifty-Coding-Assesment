const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Something went wrong:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectMongoDB;
