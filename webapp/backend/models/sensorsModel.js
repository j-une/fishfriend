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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sensor_Data", sensorsSchema, "sensor_data");
