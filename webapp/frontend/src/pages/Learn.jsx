import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  );
}

// TODO: finish entire page
function Learn() {
  const navigate = useNavigate();
  const location = useLocation();

  const paths = ["/learn", "basic-guide", "database", "fish-friend"];
  const pathNames = [
    "/learn",
    "/learn/basic-guide",
    "/learn/database",
    "/learn/fish-friend",
  ];

  const [value, setValue] = useState(
    pathNames.indexOf(location.pathname) !== -1
      ? pathNames.indexOf(location.pathname)
      : 2
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(paths[newValue]);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Learn
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Overview" />
            <Tab label="Basic Guide" />
            <Tab label="Fish Database" />
            <Tab label="Fish Friend" />
          </Tabs>
        </Box>
        <TabPanel>
          {value === 0 && (
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Overview
                </Typography>
                <Typography>
                  This is the learn section where you can find the basic guide
                  to pet fish care, a database of freshwater fish species that
                  you can search, and an overview of the Fish Friend product and
                  how it operates. Click the tabs above to navigate.
                </Typography>
              </Box>
              <Box sx={{ flex: 1, pl: 4 }}></Box>
            </Box>
          )}
          <Outlet />
        </TabPanel>
      </Box>
    </>
  );
}

export default Learn;
