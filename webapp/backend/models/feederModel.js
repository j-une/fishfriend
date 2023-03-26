const mongoose = require("mongoose");

const feederSchema = mongoose.Schema({
  times_per_day: {
    type: Number,
    required: true,
  },
  rotations: {
    type: Number,
    enum: [0, 1, 2, 3],
    required: true,
  },
});

module.exports = mongoose.model("Feeder", feederSchema, "feeder");
