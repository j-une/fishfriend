import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// TODO: functionality of this feature
function YourFish() {
  return (
    <Card sx={{ mt: 3, flexGrow: 2, borderRadius: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Your fish:</Typography>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add
          </Button>
        </Box>
        <Box sx={{ p: "20px 0px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Species</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Paul</TableCell>
                <TableCell>Comet Goldfish</TableCell>
                <TableCell>2.5</TableCell>
                <IconButton color="secondary">
                  <DeleteIcon />
                </IconButton>
              </TableRow>
              <TableRow>
                <TableCell>Dinil</TableCell>
                <TableCell>Black Moor Goldfish</TableCell>
                <TableCell>1</TableCell>
                <IconButton color="secondary">
                  <DeleteIcon />
                </IconButton>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}

export default YourFish;
