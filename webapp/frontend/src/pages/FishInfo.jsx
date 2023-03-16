import {
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function FishInfo(props, { route }) {
  const { state } = useLocation();
  const fishInfo = state;
  const scientificName = state.fish[1];
  const [fishBlurb, setFishBlurb] = useState("");

  const fetchFish = async (fishName) => {
    try {
      const wikiFishResponse = await fetch(
        "/api/database/wikiFish?" +
          new URLSearchParams({
            fish: fishName,
          })
      );
      const wikiFishJSON = await wikiFishResponse.json();
      setFishBlurb(
        wikiFishJSON.query.pages[Object.keys(wikiFishJSON.query.pages)[0]]
          .extract
      );
      console.log(wikiFishJSON);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFish(state.fish[0] || scientificName);
  }, []);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/learn/database">
          Database
        </Link>
        <Typography color="text.primary">
          {state.fish[0] || state.fish[1]}
        </Typography>
      </Breadcrumbs>
      <Typography variant="h5" sx={{ mt: 4 }}>
        {state.fish[0]}
      </Typography>
      {fishBlurb}
      <Table sx={{ minWidth: 650, mt: 5 }} style={{ tableLayout: "fixed" }}>
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
            <TableCell align="center">{fishInfo.fish[0] || "N/A"}</TableCell>
            <TableCell align="center">{fishInfo.fish[1] || "N/A"}</TableCell>
            <TableCell align="center">{fishInfo.fish[3] || "N/A"}</TableCell>
            <TableCell align="center">{fishInfo.fish[5] || "N/A"}</TableCell>
            <TableCell align="center">{fishInfo.fish[6] || "N/A"}</TableCell>
            <TableCell align="center">{fishInfo.fish[7] || "N/A"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default FishInfo;
