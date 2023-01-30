const asyncHandler = require("express-async-handler");

const Sensor_Data = require("../models/sensorsModel");

const getSensorData = asyncHandler(async (req, res) => {
  const sensor_data = await Sensor_Data.find().limit(1).sort({ $natural: -1 });
  res.status(200).json(sensor_data);
});

const sendSensorData = asyncHandler(async (req, res) => {
  const sensor_data = await Sensor_Data.create({
    ph: req.body.ph,
    temperature: req.body.temperature,
    food_level: req.body.food_level,
    status: req.body.status,
  });
  res.status(200).json(sensor_data);
});

module.exports = {
  getSensorData,
  sendSensorData,
};
