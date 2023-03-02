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
  Slider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

function TemperatureAction(props) {
  // TODO: change recommended temperature range
  const marks = [
    {
      value: 10,
      label: "10°C",
    },
    {
      value: 17,
      label: "17°C",
    },
    {
      value: 24,
      label: "24°C",
    },
    {
      value: 40,
      label: "40°C",
    },
  ];
  const [open, setOpen] = useState(false);
  const [temperature, setTemperature] = useState(
    props.data.data.temperature || 20
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      // Set new temperature setting
      const response = await fetch("/api/commands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temperature,
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
      <ListItem>
        <ListItemButton onClick={handleClickOpen}>
          <ListItemText primary="Water temperature" />
          <ArrowForwardIcon />
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>Set water temperature</Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* TODO: change placeholder recommended temperature range */}
          Your tank needs a temperature range between 17-24° C.
          <Box sx={{ p: "20px 25px 0px 25px" }}>
            <Slider
              value={temperature}
              onChange={(event, newTemp) => {
                setTemperature(newTemp);
              }}
              min={10}
              max={40}
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TemperatureAction;
