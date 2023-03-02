import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";

// TODO: functionality of this feature
function YourFish() {
  return (
    <Card sx={{ mt: 2, flexGrow: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6">Your fish:</Typography>
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
              </TableRow>
              <TableRow>
                <TableCell>Dinil</TableCell>
                <TableCell>Black Moor Goldfish</TableCell>
                <TableCell>1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}

export default YourFish;
