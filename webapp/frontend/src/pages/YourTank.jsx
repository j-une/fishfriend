import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

function YourTank() {
  const [sensorData, setSensorData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/sensors");
        const json = await res.json();
        setSensorData(json);
      } catch (error) {
        console.log(error);
      }
    };

    const id = setInterval(() => {
      fetchData();
    }, 3000);

    fetchData();

    return () => clearInterval(id);
  }, []);
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Your Tank
      </Typography>
      {sensorData && (
        <>
          <p>pH: {sensorData.ph}</p>
          <p>temperature: {sensorData.temperature}</p>
          <p>food level: {sensorData.food_level}</p>
          <br />
          <h5>Send commands:</h5>
          <iframe
            name="dummyframe"
            title="dummyframe"
            id="dummyframe"
            style={{ display: "none" }}
          ></iframe>
          <form
            action="http://localhost:2000/api/commands"
            method="POST"
            target="dummyframe"
          >
            <label htmlFor="temperature">temperature: </label>
            <input id="temperature" type="text" name="temperature" />
            <br />
            <label htmlFor="feeder">feeder: </label>
            <input id="feeder" type="text" name="feeder" />
            <br />
            <label htmlFor="water_change">water change: </label>
            <input id="water_change" type="text" name="water_change" />
            <br />
            <button>send</button>
          </form>
          <br />{" "}
        </>
      )}
    </>
  );
}

export default YourTank;
