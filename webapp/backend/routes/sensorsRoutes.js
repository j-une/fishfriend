const express = require("express");
const router = express.Router();
const {
  getSensorData,
  sendSensorData,
  getGraphSensorData,
} = require("../controllers/sensorsController");

router.get("/", getSensorData);
router.post("/", sendSensorData);

router.get("/graph", getGraphSensorData);

module.exports = router;
