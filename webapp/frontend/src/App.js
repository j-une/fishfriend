import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import YourTank from "./pages/YourTank";
import Learn from "./pages/Learn";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Testing from "./pages/Testing";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { useEffect, useState } from "react";
import { resetFeeder, resetWaterChange } from "./utils/reset";
import { Box } from "@mui/system";
import FishInfo from "./pages/FishInfo";
import FishDatabase from "./pages/FishDatabase";
import BasicGuide from "./pages/BasicGuide";
import FishFriend from "./pages/FishFriend";

let theme = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#c951bf",
    },
    background: {
      default: "#222222",
    },
  },
});

function App() {
  const [sensorData, setSensorData] = useState();
  const [commandData, setCommandData] = useState();
  const [feederState, setFeederState] = useState("off");
  const [waterChangeState, setWaterChangeState] = useState();

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

        // Reset feeder and water change commands when Arduino receives the commands
        resetFeeder(feederState, sensorJSON[0].feeder);
        resetWaterChange(waterChangeState, sensorJSON[0].status);
        setFeederState(sensorJSON[0].feeder);
        setWaterChangeState(sensorJSON[0].status);

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
  }, [feederState, waterChangeState]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: "#F9F9F9" },
          }}
        />
        <Router>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: "28px 56px",
              marginLeft: "240px",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/your-tank"
                element={
                  <YourTank
                    sensorData={sensorData}
                    commandData={commandData}
                    waterChangeState={waterChangeState}
                  />
                }
              />
              <Route path="/learn" element={<Learn />}>
                <Route path="basic-guide" element={<BasicGuide />} />
                <Route path="database">
                  <Route index={true} element={<FishDatabase />} />
                  <Route path=":fish" element={<FishInfo />} />
                </Route>
                <Route path="fish-friend" element={<FishFriend />} />
              </Route>
              <Route path="/settings" element={<Settings />} />
              <Route
                path="/testing"
                element={
                  <Testing
                    sensorData={sensorData}
                    commandData={commandData}
                    waterChangeState={waterChangeState}
                  />
                }
              />
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
