const mongoose = require("mongoose");

const commandsSchema = mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  feeder: {
    type: Number,
    enum: [0, 1, 2, 3], // number of rotations, 0 is off
    required: true,
  },
  water_change_req: {
    type: Boolean,
    required: true,
  },
  water_change_complete: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Commands", commandsSchema, "commands");
