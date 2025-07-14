const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const { userId, name } = req.body;
    const newUser = new User({ userId, name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
