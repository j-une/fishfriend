import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import YourTank from "./pages/YourTank";
import Learn from "./pages/Learn";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Testing from "./pages/Testing";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

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
  return (
    <>
      <Sidebar>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              body: { backgroundColor: "#F9F9F9" },
            }}
          />
          <Router>
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/your-tank" element={<YourTank />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/testing" element={<Testing />} />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </Sidebar>
    </>
  );
}

export default App;
