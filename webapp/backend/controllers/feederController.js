const asyncHandler = require("express-async-handler");
const scheduledFeeder = require("../scheduled/feeder");
const Feeder = require("../models/feederModel");

// Get current feeder settings
const getFeederInterval = asyncHandler(async (req, res) => {
  const response = await Feeder.find().limit(1).sort({ $natural: -1 });
  res.status(200).json(response[0]);
});

// Set feeder settings
const sendFeederInterval = asyncHandler(async (req, res) => {
  // Update scheduled feeder interval
  await scheduledFeeder.setFeeder(req.body.times_per_day, req.body.rotations);

  // Update stored current feeder settings
  const response = await Feeder.find().limit(1).sort({ $natural: -1 });
  let feeder;
  if (response[0]) {
    feeder = await Feeder.findOneAndUpdate(
      {
        times_per_day: response[0].times_per_day,
      },
      {
        times_per_day: req.body.times_per_day,
        rotations: req.body.rotations,
      },
      { new: true }
    );
  } else {
    feeder = await Feeder.create({
      times_per_day: req.body.times_per_day,
      rotations: req.body.rotations,
    });
  }
  res.status(200).json(feeder);
});

module.exports = {
  getFeederInterval,
  sendFeederInterval,
};
