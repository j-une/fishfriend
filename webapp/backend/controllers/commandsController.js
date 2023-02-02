const asyncHandler = require("express-async-handler");

const Commands = require("../models/commandsModel");

const getCommands = asyncHandler(async (req, res) => {
  const commands = await Commands.find().limit(1).sort({ $natural: -1 });
  res.status(200).json(commands[0]);
});

const sendCommands = asyncHandler(async (req, res) => {
  const commands = await Commands.create({
    temperature: req.body.temperature,
    feeder: req.body.feeder,
    water_change: req.body.water_change,
  });
  res.status(200).json(commands);
});

module.exports = {
  getCommands,
  sendCommands,
};
