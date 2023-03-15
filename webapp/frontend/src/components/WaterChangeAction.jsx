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
import { useEffect, useRef, useState } from "react";

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

function WaterChangeAction(props) {
  const prevWaterChangeState = usePreviousValue(props.data.waterChangeState);
  // const { waterChangeState } = props.data;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addWater, setAddWater] = useState(false);

  useEffect(() => {
    if (
      prevWaterChangeState === "waste" &&
      props.data.waterChangeState === "new"
    ) {
      setAddWater(true);
      setLoading(false);
    }
  }, [props.data.waterChangeState]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };

  const handleSubmit = async () => {
    const command = addWater
      ? { water_change_complete: true, water_change_req: false }
      : { water_change_req: true };
    try {
      // Send new water change action
      const response = await fetch("/api/commands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      if (addWater) {
        setAddWater(false);
      } else {
        setLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClickOpen} sx={{ p: 2 }}>
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
          {/* TODO: edit loading button to nicer UI telling user water change is in progress/done */}
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleSubmit}
          >
            {addWater ? (
              <div>Click when done adding water </div>
            ) : (
              <div>Start water change</div>
            )}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default WaterChangeAction;
