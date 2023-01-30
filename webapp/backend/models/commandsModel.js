const mongoose = require("mongoose");

const commandsSchema = mongoose.Schema(
  {
    temperature: {
      type: Number,
      required: true,
    },
    food: {
      type: Number,
      required: true,
    },
    water_change: {
      type: String,
      enum: ["start", "normal"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Commands", commandsSchema, "commands");
