import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import {
  BrowserRouter as Router,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

function FishDatabase(props) {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState();
  const [wikiData, setWikiData] = useState();
  const [categorizedFish, setCategorizedFish] = useState();
  const [fish, setFish] = useState();

  const categorizeFish = (array) => {
    const catfish = array.slice(0, 6);
    const characins = array.slice(5, 10);
    const cichlids = array.slice(9, 16);
    const cyprinids = array.slice(15, 21);
    const loaches = array.slice(21, 22);
    const livebearers = array.slice(22, 25);
    const labyrinth = array.slice(24, 27);
    const rainbow = array.slice(27, 28);
    const gobies = array.slice(28, 29);
    const sunfish = array.slice(29, 30);
    const other = array.slice(30, 31);

    const newArray = [
      catfish,
      characins,
      cichlids,
      cyprinids,
      loaches,
      livebearers,
      labyrinth,
      rainbow,
      gobies,
      sunfish,
      other,
    ];

    newArray.forEach((section, index) => {
      section.forEach((table) => table.splice(0, 1));
      newArray[index] = section.flat();
    });

    return newArray;
  };

  const fetchData = async () => {
    try {
      const [tableResponse, wikiResponse] = await Promise.all([
        fetch("/api/database/table"),
        fetch("/api/database/wikiList"),
      ]);
      const [tableJSON, wikiJSON] = await Promise.all([
        tableResponse.json(),
        wikiResponse.json(),
      ]);
      setTableData(tableJSON);
      setWikiData(wikiJSON);
      setCategorizedFish(categorizeFish(tableJSON));
      console.log(categorizedFish);
      //   console.log(categorizedFish.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    setFish();
  }, []);

  return (
    <Box sx={{ textAlign: "left" }}>
      {!fish && (
        <>
          <SearchBar />
          {wikiData && categorizedFish && (
            <>
              {wikiData.parse.sections.slice(0, 11).map((section, index) => (
                <Accordion disableGutters key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">{section.line}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ display: "flex" }}>
                    <Box sx={{ flex: 1 }}>
                      {categorizedFish[index].map((fish, fishIndex) => (
                        <>
                          {fishIndex < categorizedFish[index].length / 2 && (
                            <div>
                              <Link
                                component="button"
                                onClick={() => {
                                  navigate(`ja`, { fish: fish });
                                  // navigate(`${fish[1]}`, { fish: fish });
                                  // fetchFish(fish[1]);
                                  // setFish(fish);
                                }}
                              >
                                {fish[0]} ({fish[1]})
                              </Link>
                            </div>
                          )}
                        </>
                      ))}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      {categorizedFish[index].map((fish, fishIndex) => (
                        <>
                          {fishIndex > categorizedFish[index].length / 2 && (
                            <div>
                              <Link component="button" onClick={() => {}}>
                                {fish[0]} ({fish[1]})
                              </Link>
                            </div>
                          )}
                        </>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          )}
          {/* <FishInfo fish={fish} blurb={fishInfo} /> */}
          {/* {fishHTML && (
        <Table
          sx={{ minWidth: 650 }}
          style={{ tableLayout: "fixed" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {fishHTML[0][0].map(
                (header, index) =>
                  index !== 2 &&
                  index !== 4 && (
                    <TableCell key={index} align="center">
                      {header}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fishHTML.map((section, index) =>
                section.slice(1).map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {row.map(
                      (cell, index) =>
                        index !== 2 &&
                        index !== 4 && (
                          <TableCell key={index} align="center">
                            {cell}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                ))
              )
            }
          </TableBody>
        </Table>
      )} */}
        </>
      )}
      <Outlet />
    </Box>
  );
}

export default FishDatabase;
