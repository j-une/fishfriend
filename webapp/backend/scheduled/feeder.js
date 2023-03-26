const schedule = require("node-schedule");

let job;

// Intitalize feeder
const initializeFeeder = () => {
  // TODO: update initial time interval based user input of fish, right now set for two a day
  job = schedule.scheduleJob("0 */12 * * *", function () {
    sendFeederCommand(0);
  });
};

// Set feeder given times per day and number of rotations
const setFeeder = async (timesPerDay, rotations) => {
  // Calculate hour interval to send feeder command
  const hour = Math.round(24 / timesPerDay);
  // Cancel existing job
  job.cancel();
  // Reschedule job with new time and rotations
  job = schedule.scheduleJob(`0 */${hour} * * *`, async function () {
    sendFeederCommand(rotations);
  });
  return true;
};

// Helper function to send command with feeder rotations
const sendFeederCommand = async (rotations) => {
  let response;
  try {
    // Get current settings for temperature and water change
    const commandsRes = await fetch("http://localhost:2000/api/commands");
    commands = await commandsRes.json();

    // Send new commands with updated number of rotations for feeder
    const res = await fetch("http://localhost:2000/api/commands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temperature: commands.temperature,
        feeder: rotations,
        water_change_req: commands.water_change_req,
        water_change_complete: commands.water_change_complete,
      }),
    });
    response = await res.json();
  } catch (error) {
    console.log(error);
  }
  return response;
};

module.exports = {
  initializeFeeder,
  setFeeder,
};
