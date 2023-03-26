const express = require("express");
const router = express.Router();
const {
  getSensorData,
  sendSensorData,
  getGraphSensorData,
  getDayGraphSensorData,
  getWeekGraphSensorData,
  getMonthGraphSensorData,
} = require("../controllers/sensorsController");

router.get("/", getSensorData);
router.post("/", sendSensorData);

router.get("/graph", getGraphSensorData);
router.get("/graph/day", getDayGraphSensorData);
router.get("/graph/week", getWeekGraphSensorData);
router.get("/graph/month", getMonthGraphSensorData);

module.exports = router;
