const asyncHandler = require("express-async-handler");

const Sensor_Data = require("../models/sensorsModel");

// Get last sensor data entry
const getSensorData = asyncHandler(async (req, res) => {
  const sensor_data = await Sensor_Data.find().limit(1).sort({ $natural: -1 });
  res.status(200).json(sensor_data[0]);
});

// Used by Arduino to send sensor data
const sendSensorData = asyncHandler(async (req, res) => {
  const sensor_data = await Sensor_Data.create({
    ph: parseFloat(req.body.ph),
    temperature: parseFloat(req.body.temperature),
    food_level: parseFloat(req.body.food_level),
    feeder: req.body.feeder,
    status: req.body.status,
  });
  res.status(200).json(sensor_data);
});

// Get last 50 sensor data entries, used to plot
const getGraphSensorData = asyncHandler(async (req, res) => {
  const sensor_data = await Sensor_Data.find().limit(50).sort({ $natural: -1 });
  res.status(200).json(sensor_data);
});

module.exports = {
  getSensorData,
  sendSensorData,
  getGraphSensorData,
};
