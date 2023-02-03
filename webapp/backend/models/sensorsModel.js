const mongoose = require("mongoose");

const sensorsSchema = mongoose.Schema(
  {
    ph: {
      type: String,
      required: true,
    },
    temperature: {
      type: String,
      required: true,
    },
    food_level: {
      type: String,
      required: true,
    },
    feeder: {
      type: String,
      enum: ["on", "off"],
      required: true,
    },
    status: {
      type: String,
      enum: ["normal", "waste", "clean"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sensor_Data", sensorsSchema, "sensor_data");
