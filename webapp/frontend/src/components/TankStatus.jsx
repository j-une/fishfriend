import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function TankStatus(props) {
  const sensorData = props.data;
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 3 }}>
        {/* TANK STATUS */}
        <Typography variant="h6">Current tank status:</Typography>
        {sensorData && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: "0px 70px",
            }}
          >
            <Box sx={{ textAlign: "center", p: "15px 100px" }}>
              <Typography fontWeight={400} variant="h6">
                Temperature
              </Typography>
              <CheckCircleOutlineIcon
                color="success"
                fontSize="large"
                sx={{ verticalAlign: "middle", mb: 2, mr: 1 }}
              />
              <Typography variant="h4" display="inline-block">
                {sensorData.temperature}° C
              </Typography>
              <Typography lineHeight={1}>
                Your tank needs a temperature range between 17-24° C.
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", p: "15px 100px" }}>
              <Typography fontWeight={400} variant="h6">
                pH Level
              </Typography>
              <CheckCircleOutlineIcon
                color="success"
                fontSize="large"
                sx={{ verticalAlign: "middle", mb: 2, mr: 1 }}
              />
              <Typography variant="h4" display="inline-block">
                {sensorData.ph}
              </Typography>
              <Typography lineHeight={1}>
                Your tank water needs a pH levek range between 6.5-7.5.
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", p: "15px 100px" }}>
              <Typography fontWeight={400} variant="h6">
                Food Level
              </Typography>
              <ErrorOutlineIcon
                color="warning"
                fontSize="large"
                sx={{ verticalAlign: "middle", mb: 2, mr: 1 }}
              />
              <Typography variant="h4" display="inline-block">
                0%
              </Typography>
              <Typography lineHeight={1}>
                Your fish need 10mg of food per day; make sure the feeder is not
                empty.
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default TankStatus;
