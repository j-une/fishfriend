const express = require("express");
const router = express.Router();
const {
  getSensorData,
  sendSensorData,
} = require("../controllers/sensorsController");

router.get("/", getSensorData);

router.post("/", sendSensorData);

module.exports = router;
