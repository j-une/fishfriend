import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

function WaterChangeAction(props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      // Send new water change action
      const response = await fetch("/api/commands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          water_change: "on",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ListItem>
        <ListItemButton onClick={handleClickOpen}>
          <ListItemText primary="Automatic water change" />
          <ArrowForwardIcon />
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>Perform water change</Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          When the nitrate levels in the water become too high, it can become
          toxic for your fish. Perform regular water changes to prevent this.
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          {/* TODO: tell user when water change is done and reset to off */}
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleSubmit}
          >
            Start
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default WaterChangeAction;
