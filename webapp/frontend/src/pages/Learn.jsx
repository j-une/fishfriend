import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
  const [value, setValue] = useState(0);
  const paths = ["/learn", "basic-guide", "database", "fish-friend"];

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
          {value === 0 && <Typography>Learn overview</Typography>}
          <Outlet />
        </TabPanel>
      </Box>
    </>
  );
}

export default Learn;
