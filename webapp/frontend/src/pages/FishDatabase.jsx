import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { BrowserRouter as Router, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

function FishDatabase() {
  const navigate = useNavigate();
  const [wikiData, setWikiData] = useState();
  const [categorizedFish, setCategorizedFish] = useState();

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
      setWikiData(wikiJSON);
      setCategorizedFish(categorizeFish(tableJSON));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <>
        {wikiData && categorizedFish ? (
          <>
            <Typography variant="h4">
              Explore our database of freshwater fish species
            </Typography>
            <Typography variant="body1">
              Whether you're looking for information about the fish you
              currently have or for a new fish to adopt, you can find it here.
            </Typography>
            <SearchBar fish={categorizedFish.flat()} />
            <Typography variant="h6" textAlign="left" sx={{ mt: 4, mb: 1 }}>
              Browse by category
            </Typography>
            {wikiData.parse.sections.slice(0, 11).map((section, index) => (
              <Accordion disableGutters key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{section.line}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex" }}>
                  <Box sx={{ flex: 1, textAlign: "left" }}>
                    {categorizedFish[index].map((fish, fishIndex) => (
                      <>
                        {fishIndex < categorizedFish[index].length / 2 && (
                          <div>
                            <Link
                              component="button"
                              onClick={() => {
                                navigate(fish[1], {
                                  state: { fish },
                                });
                              }}
                            >
                              {fish[0]} ({fish[1]})
                            </Link>
                          </div>
                        )}
                      </>
                    ))}
                  </Box>
                  <Box sx={{ flex: 1, textAlign: "left" }}>
                    {categorizedFish[index].map((fish, fishIndex) => (
                      <>
                        {fishIndex > categorizedFish[index].length / 2 && (
                          <div>
                            <Link
                              component="button"
                              onClick={() => {
                                navigate(fish[1], {
                                  state: { fish },
                                });
                              }}
                            >
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
        ) : (
          <Box sx={{ height: 20, p: 30 }}>
            <Typography variant="h5">Loading...</Typography>
          </Box>
        )}
      </>
    </Box>
  );
}

export default FishDatabase;
