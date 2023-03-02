import { Typography } from "@mui/material";
import moment from "moment";

// TODO: entire page
function Home() {
  const currentHour = moment().format("HH");
  const greeting =
    currentHour > 16 ? "evening" : currentHour > 11 ? "afternoon" : "morning";
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Good {greeting}!
      </Typography>
    </>
  );
}

export default Home;
