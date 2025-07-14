const Activity = require("../models/ActivityModel");

exports.createActivity = async (req, res) => {
  try {
    const { userId, action } = req.body;
    if (!userId || !action)
      return res.status(400).json({ error: "Missing userId or action" });

    const activity = new Activity({ userId, action });
    await activity.save();

    res.status(201).json({ message: "Activity logged successfully", activity });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(
      activities.map((a) => ({ action: a.action, timestamp: a.timestamp }))
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.getActivitySummary = async (req, res) => {
  try {
    const summary = await Activity.aggregate([
      { $match: { userId: req.params.userId } },
      { $group: { _id: "$action", count: { $sum: 1 } } },
    ]);

    const formatted = {};
    summary.forEach((item) => {
      formatted[item._id] = item.count;
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
