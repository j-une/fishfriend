const asyncHandler = require("express-async-handler");

const Sensor_Data = require("../models/sensorsModel");

const getSensorData = asyncHandler(async (req, res) => {
  const sensor_data = await Sensor_Data.find();
  res.status(200).json(sensor_data);
});

const sendSensorData = asyncHandler(async (req, res) => {
  const sensor_data = await Sensor_Data.create({
    ph: req.body.ph,
    temperature: req.body.temperature,
  });
  res.status(200).json(sensor_data);
});

module.exports = {
  getSensorData,
  sendSensorData,
};
