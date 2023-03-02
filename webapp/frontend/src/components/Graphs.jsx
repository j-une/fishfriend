import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { Box } from "@mui/system";

function Graphs(data) {
  // Format graphs from oldest to newest
  const sensorData = [...data.data].reverse();
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent sx={{ display: "flex", p: 3 }}>
        <Box sx={{ flex: 1 }} width="100%">
          <Typography variant="h6">pH Levels</Typography>
          <Box height={250} width="100%">
            <ResponsiveContainer width="99%">
              <LineChart
                data={sensorData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="createdAt"
                  domain={["auto", "auto"]}
                  name="Time"
                  tickFormatter={(unixTime) =>
                    moment(unixTime).format("h:mm a")
                  }
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(unixTime) =>
                    moment(unixTime).format("h:mm a")
                  }
                />
                <Line type="monotone" dataKey="ph" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }} width="100%">
          <Typography variant="h6">Temperature</Typography>
          <Box height={250} width="100%">
            <ResponsiveContainer width="99%">
              <LineChart
                data={sensorData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="createdAt"
                  domain={["auto", "auto"]}
                  name="Time"
                  tickFormatter={(unixTime) =>
                    moment(unixTime).format("h:mm a")
                  }
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(unixTime) =>
                    moment(unixTime).format("h:mm a")
                  }
                />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Graphs;
