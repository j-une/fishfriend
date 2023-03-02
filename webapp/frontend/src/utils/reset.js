export const resetFeeder = async (prevState, newState) => {
  if (prevState === newState) {
    return;
  }
  if (prevState === "on" && newState === "off") {
    console.log("feeder is finished");
  }
  if (prevState === "off" && newState === "on") {
    console.log("feeder is starting");
    try {
      // Stop sending number of feeder rotations
      const response = await fetch("/api/commands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feeder: "0",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const resetWaterChange = async (prevState, newState) => {
  if (prevState === newState) {
    return;
  }
  if (prevState === "waste" && newState === "normal") {
    console.log("water change is finished");
  }
  if (prevState === "normal" && newState === "waste") {
    console.log("water change is starting");
    try {
      // Stop sending water change request
      const response = await fetch("/api/commands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          water_change: "off",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
};
