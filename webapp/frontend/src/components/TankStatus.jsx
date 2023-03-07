import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

function TankStatus(props) {
  const sensorData = props.data;
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        {/* TANK STATUS */}
        <Typography variant="h6">Current tank status:</Typography>
        {sensorData && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Box sx={{ textAlign: "center", p: 2 }}>
              <Typography>Temperature</Typography>
              <Typography variant="h6">{sensorData.temperature}° C</Typography>
            </Box>
            <Box sx={{ textAlign: "center", p: 2 }}>
              <Typography>pH Level</Typography>
              <Typography variant="h6">{sensorData.ph}</Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default TankStatus;
