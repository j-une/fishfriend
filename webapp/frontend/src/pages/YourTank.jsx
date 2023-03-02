import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Graphs from "../components/Graphs";
import TankStatus from "../components/TankStatus";
import YourFish from "../components/YourFish";
import TankActions from "../components/TankActions";

function YourTank() {
  const [sensorData, setSensorData] = useState();
  const [commandData, setCommandData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch sensor and commands data every 3 seconds, send to all children through props
      try {
        const [sensorResponse, commandsResponse] = await Promise.all([
          fetch("/api/sensors/graph"),
          fetch("/api/commands"),
        ]);
        const [sensorJSON, commandsJSON] = await Promise.all([
          sensorResponse.json(),
          commandsResponse.json(),
        ]);

        setSensorData(sensorJSON);
        setCommandData(commandsJSON);
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
      {sensorData && commandData && (
        <>
          <Typography variant="h5" gutterBottom>
            Your Tank
          </Typography>
          <TankStatus data={sensorData[0]} />
          <Box sx={{ display: "flex", columnGap: 2 }}>
            <TankActions data={commandData} />
            <YourFish />
          </Box>
          <Graphs data={sensorData} />
        </>
      )}
    </>
  );
}

export default YourTank;
