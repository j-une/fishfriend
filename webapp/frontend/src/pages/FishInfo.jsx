import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

// TODO: fix route to fish info page
function FishInfo(props) {
  console.log("in fish info", props);
  const [fishInfo, setFishInfo] = useState();

  const fetchFish = async (fishName) => {
    try {
      const wikiFishResponse = await fetch(
        "/api/database/wikiFish?" +
          new URLSearchParams({
            fish: props.fish[1],
          })
      );
      const wikiFishJSON = await wikiFishResponse.json();
      setFishInfo(wikiFishJSON);
      console.log(wikiFishJSON);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFish(props.fish);
  });

  return (
    <>
      {props.fish && fishInfo && (
        <>
          <Typography variant="h4" gutterBottom>
            {props.fish[0]} ({props.fish[1]})
          </Typography>
          <Typography gutterBottom>
            {Object.values(props.blurb.query.pages)[0].extract}
          </Typography>
          <Typography gutterBottom>
            {Object.values(props.blurb.query.pages)[0].extract}
          </Typography>
          <Table sx={{ minWidth: 650 }} style={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Scientific Name</TableCell>
                <TableCell align="center">Size</TableCell>
                <TableCell align="center">Tank Size</TableCell>
                <TableCell align="center">Temperature Range</TableCell>
                <TableCell align="center">pH Range</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{props.fish[0]}</TableCell>
                <TableCell align="center">{props.fish[1]}</TableCell>
                <TableCell align="center">{props.fish[3]}</TableCell>
                <TableCell align="center">{props.fish[5]}</TableCell>
                <TableCell align="center">{props.fish[6]}</TableCell>
                <TableCell align="center">{props.fish[7]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}

export default FishInfo;
