const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const scheduledFeeder = require("./scheduled/feeder");

const port = process.env.PORT || 2000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/sensors", require("./routes/sensorsRoutes"));
app.use("/api/commands", require("./routes/commandsRoutes"));
app.use("/api/feeder", require("./routes/feederRoutes"));
app.use("/api/database", require("./routes/databaseRoutes"));

scheduledFeeder.initializeFeeder();

// BELOW FOR TESTING
// let val;
// app.get("/api/hello", (req, res) => {
//   if (req.query.led) {
//     val = req.query.led;
//   }
//   console.log(val);
//   res.send({ LED: val });
// });

// let val;
// app.get("/api/hello", (req, res) => {
//   if (req.query.temperature) {
//     val = req.query.temperature;
//   }
//   console.log(val);
//   res.send({ temperature: val });
// });

// app.post("/api/world", (req, res) => {
//   res.send(`POST request received: ${req.body}`);
// });

app.listen(port, () => console.log(`Server started on port ${port}`));
