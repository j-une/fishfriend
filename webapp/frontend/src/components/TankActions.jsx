import {
  Card,
  CardContent,
  Box,
  Typography,
  List,
  Divider,
} from "@mui/material";
import WaterChangeAction from "./WaterChangeAction";
import TemperatureAction from "./TemperatureAction";
import FeederAction from "./FeederAction";

function TankActions(props) {
  return (
    <Card sx={{ mt: 3, flexGrow: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6">Tank actions:</Typography>
        <Box>
          <List>
            <WaterChangeAction data={props} />
            <Divider />
            <TemperatureAction data={props} />
            <Divider />
            <FeederAction />
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TankActions;
