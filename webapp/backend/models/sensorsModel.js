const mongoose = require("mongoose");

const sensorsSchema = mongoose.Schema(
  {
    ph: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    food_level: {
      type: Number,
      required: true,
    },
    feeder: {
      type: String,
      enum: ["on", "off"],
      required: true,
    },
    status: {
      type: String,
      enum: ["normal", "waste"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sensor_Data", sensorsSchema, "sensor_data");
