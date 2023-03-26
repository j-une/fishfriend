import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";

function Testing(props) {
  const [comTemp, setComTemp] = useState();
  const [comFeed, setComFeed] = useState();
  const [comWatComplete, setComWatComplete] = useState();
  const [comWatReq, setComWatReq] = useState();

  const [senTemp, setSenTemp] = useState();
  const [senPh, setSenPh] = useState();
  const [senFeed, setSenFeed] = useState();
  const [senStatus, setSendStatus] = useState();
  console.log("props.sensorData", props.sensorData);
  console.log("props.commandData", props.commandData);

  const handleCommandsPost = async () => {
    const body = {
      temperature: comTemp,
      feeder: comFeed,
      water_change_complete: comWatComplete === "true",
      water_change_req: comWatReq === "true",
    };
    try {
      const response = await fetch("/api/commands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSensorsPost = async () => {
    const body = {
      temperature: senTemp,
      ph: senPh,
      feeder: senFeed,
      status: senStatus,
    };
    try {
      const response = await fetch("/api/sensors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {props.sensorData && props.commandData && (
        <>
          <Typography variant="h5" gutterBottom>
            Testing
          </Typography>
          <Box sx={{ display: "flex", columnGap: 2 }}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6">Sensor Data GET Request</Typography>
                <Typography>
                  <b>createdAt:</b>{" "}
                  {moment
                    .utc(props.sensorData[0].createdAt)
                    .local()
                    .format("YYYY-MMM-DD hh:mm:ss A")}
                </Typography>
                <Typography>
                  <b>updatedAt:</b>{" "}
                  {moment
                    .utc(props.sensorData[0].updatedAt)
                    .local()
                    .format("YYYY-MMM-DD hh:mm:ss A")}
                </Typography>
                <Typography>
                  <b>temperature:</b> {props.sensorData[0].temperature}
                </Typography>
                <Typography>
                  <b>ph:</b> {props.sensorData[0].ph}
                </Typography>
                <Typography>
                  <b>feeder:</b> {props.sensorData[0].feeder}
                </Typography>
                <Typography>
                  <b>status:</b> {props.sensorData[0].status}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6">Command Data GET Request</Typography>
                <Typography>
                  <b>temperature:</b> {props.commandData.temperature}
                </Typography>
                <Typography>
                  <b>feeder:</b> {props.commandData.feeder}
                </Typography>
                <Typography>
                  <b>water_change_complete:</b>{" "}
                  {props.commandData.water_change_complete ? "true" : "false"}
                </Typography>
                <Typography>
                  <b>water_change_req:</b>{" "}
                  {props.commandData.water_change_req ? "true" : "false"}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ display: "flex", columnGap: 2, mt: 2 }}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6">Sensor Data POST Request</Typography>
                <Typography>
                  <b>temperature:</b>{" "}
                  <TextField
                    value={senTemp}
                    size="small"
                    onChange={(event) => {
                      setSenTemp(event.target.value);
                    }}
                  />
                </Typography>
                <Typography>
                  <b>ph:</b>{" "}
                  <TextField
                    value={senPh}
                    size="small"
                    onChange={(event) => {
                      setSenPh(event.target.value);
                    }}
                  />
                </Typography>
                <Typography>
                  <b>feeder:</b>{" "}
                  <TextField
                    value={senFeed}
                    size="small"
                    onChange={(event) => {
                      setSenFeed(event.target.value);
                    }}
                  />
                </Typography>
                <Typography>
                  <b>status:</b>{" "}
                  <TextField
                    value={senStatus}
                    size="small"
                    onChange={(event) => {
                      setSendStatus(event.target.value);
                    }}
                  />
                </Typography>
                <Button variant="outlined" onClick={handleSensorsPost}>
                  Send
                </Button>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6">Command Data POST Request</Typography>
                <Typography>
                  <b>temperature:</b>{" "}
                  <TextField
                    value={comTemp}
                    size="small"
                    onChange={(event) => {
                      setComTemp(event.target.value);
                    }}
                  />
                </Typography>
                <Typography>
                  <b>feeder:</b>{" "}
                  <TextField
                    value={comFeed}
                    size="small"
                    onChange={(event) => {
                      setComFeed(event.target.value);
                    }}
                  />
                </Typography>
                <Typography>
                  <b>water_change_complete:</b>{" "}
                  <TextField
                    value={comWatComplete}
                    size="small"
                    onChange={(event) => {
                      setComWatComplete(event.target.value);
                    }}
                  />
                </Typography>
                <Typography>
                  <b>water_change_req:</b>{" "}
                  <TextField
                    value={comWatReq}
                    size="small"
                    onChange={(event) => {
                      setComWatReq(event.target.value);
                    }}
                  />
                </Typography>
                <Button variant="outlined" onClick={handleCommandsPost}>
                  Send
                </Button>
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </>
  );
}

export default Testing;
