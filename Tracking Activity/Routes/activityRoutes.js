const express = require("express");
const router = express.Router();

const activityController = require("../controllers/activityController");

router.post("/", activityController.createActivity);
router.get("/:id", activityController.getActivityById);
router.get("/summary/:userId", activityController.getActivitySummary);

module.exports = router;
