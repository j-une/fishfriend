import { Box, Typography } from "@mui/material";

// TODO: entire page
function BasicGuide() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 3 }}>
        <Typography variant="h5" gutterBottom>
          Basic Guide
        </Typography>
      </Box>
      <Box sx={{ flex: 1, pl: 4 }}></Box>
    </Box>
  );
}

export default BasicGuide;
