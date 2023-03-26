import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import NumberStepper from "./NumberStepper";

function FeederAction() {
  const [open, setOpen] = useState(false);
  const [timesPerDay, setTimesPerDay] = useState(0);
  const [numberOfRotations, setNumberOfRotations] = useState(0);

  const handleClickOpen = async () => {
    try {
      // Get current feeder settings
      const res = await fetch("/api/feeder");
      const json = await res.json();
      setTimesPerDay(json.times_per_day);
      setNumberOfRotations(json.rotations);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      // Set new feeder settings
      const response = await fetch("/api/feeder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          times_per_day: timesPerDay,
          rotations: numberOfRotations,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClickOpen} sx={{ p: 2 }}>
          <ListItemText primary="Food intervals" />
          <ArrowForwardIcon />
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>Set feeder</Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* TODO: Change this placeholder text to reflect recommended amount */}
          Your fish need 10mg of food per day, make sure the feeder is not
          empty.
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "space-evenly", mb: 3 }}>
          <NumberStepper
            title="Times per day"
            value={setTimesPerDay}
            defaultValue={parseInt(timesPerDay)}
          />
          <NumberStepper
            title="Number of rotations"
            value={setNumberOfRotations}
            defaultValue={parseInt(numberOfRotations)}
          />
        </Box>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FeederAction;
