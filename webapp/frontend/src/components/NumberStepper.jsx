import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";

function NumberStepper(props) {
  const [value, setValue] = useState(props.defaultValue || 0);

  const handleDecrement = () => {
    setValue(value - 1);
    props.value(value - 1);
  };

  const handleIncrement = () => {
    setValue(value + 1);
    props.value(value + 1);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography>{props.title}</Typography>
      <ButtonGroup>
        <Button onClick={handleDecrement}>-</Button>
        <Box
          sx={{
            minWidth: "40px",
            textAlign: "center",
            padding: 1,
            border: "1px solid rgba(0, 82, 204, 0.5)",
            borderRightColor: "transparent",
            color: "#3c94de",
          }}
        >
          {value}
        </Box>
        <Button onClick={handleIncrement}>+</Button>
      </ButtonGroup>
    </Box>
  );
}

export default NumberStepper;
