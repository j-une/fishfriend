import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
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
import { useEffect, useState } from "react";

const dates = [
  {
    value: "real",
    label: "Real-time",
  },
  {
    value: "day",
    label: "Last day",
  },
  {
    value: "week",
    label: "Last 7 days",
  },
  {
    value: "month",
    label: "Last 30 days",
  },
];

function Graphs(data) {
  // Format graphs from oldest to newest
  const realData = [...data.data].reverse();

  const [sensorData, setSensorData] = useState(realData);
  const [dayData, setDayData] = useState();
  const [weekData, setWeekData] = useState();
  const [monthData, setMonthData] = useState();

  const [range, setRange] = useState("real");

  const handleChange = (event) => {
    setRange(event.target.value);
    switch (event.target.value) {
      case "day":
        setSensorData(dayData);
        break;
      case "week":
        setSensorData(weekData);
        break;
      case "month":
        setSensorData(monthData);
        break;
      default:
        setSensorData(realData);
    }
  };

  const dataFetch = async () => {
    try {
      const [dayResponse, weekResponse, monthResponse] = await Promise.all([
        fetch("/api/sensors/graph/day"),
        fetch("/api/sensors/graph/week"),
        fetch("/api/sensors/graph/month"),
      ]);
      const [dayJSON, weekJSON, monthJSON] = await Promise.all([
        dayResponse.json(),
        weekResponse.json(),
        monthResponse.json(),
      ]);
      setDayData(dayJSON);
      setWeekData(weekJSON);
      setMonthData(monthJSON);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ flex: 6 }}>
            Sensor Graphs
          </Typography>
          <FormControl variant="standard">
            <Select
              value={range}
              onChange={handleChange}
              label="Date Range"
              disableUnderline
              sx={{ flex: 1 }}
            >
              {dates.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", mt: 2 }}>
          <Box sx={{ flex: 1 }} width="100%">
            <Typography fontWeight={500}>pH Levels</Typography>
            <Box height={250} width="100%">
              <ResponsiveContainer width="99%">
                <LineChart
                  data={sensorData}
                  margin={{
                    top: 10,
                    right: 70,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="createdAt"
                    domain={["auto", "auto"]}
                    name="Time"
                    tickFormatter={(unixTime) => {
                      let format = "h:mm:ss a";
                      switch (range) {
                        case "day":
                          format = "h:mm a";
                          break;
                        case "week":
                          format = "ddd";
                          break;
                        case "month":
                          format = "MMM-DD";
                          break;
                        default:
                          format = "h:mm:ss a";
                      }
                      return moment(unixTime).format(format);
                    }}
                  />
                  <YAxis width={20} />
                  <Tooltip
                    labelFormatter={(unixTime) =>
                      moment(unixTime).format("MMM-DD h:mm a")
                    }
                  />
                  <Line type="monotone" dataKey="ph" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }} width="100%">
            <Typography fontWeight={500}>Temperature</Typography>
            <Box height={250} width="100%">
              <ResponsiveContainer width="99%">
                <LineChart
                  data={sensorData}
                  margin={{
                    top: 10,
                    right: 70,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="createdAt"
                    name="Time"
                    tickFormatter={(unixTime) => {
                      let format = "h:mm:ss a";
                      switch (range) {
                        case "day":
                          format = "h:mm a";
                          break;
                        case "week":
                          format = "ddd";
                          break;
                        case "month":
                          format = "MMM-DD";
                          break;
                        default:
                          format = "h:mm:ss a";
                      }
                      return "   " + moment(unixTime).format(format) + "   ";
                    }}
                  />
                  <YAxis width={20} domain={[15, "auto"]} />
                  <Tooltip
                    labelFormatter={(unixTime) =>
                      moment(unixTime).format("MMM-DD h:mm a")
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Graphs;
