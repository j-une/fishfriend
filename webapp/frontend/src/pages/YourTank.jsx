import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Graphs from "../components/Graphs";
import TankStatus from "../components/TankStatus";
import YourFish from "../components/YourFish";
import TankActions from "../components/TankActions";

function YourTank(props) {
  return (
    <>
      {props.sensorData && props.commandData && (
        <>
          <Typography variant="h5" gutterBottom>
            Your Tank
          </Typography>
          {/* {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => {}}>
              <strong>Error:</strong> Stopped receiving data from Fish Friend,
              try restarting.
            </Alert>
          )} */}
          <TankStatus data={props.sensorData[0]} />
          <Box sx={{ display: "flex", columnGap: 4 }}>
            <TankActions
              data={props.commandData}
              waterChangeState={props.waterChangeState}
            />
            <YourFish />
          </Box>
          <Graphs data={props.sensorData} />
        </>
      )}
    </>
  );
}

export default YourTank;
