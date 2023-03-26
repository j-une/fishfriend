import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const navigate = useNavigate();

  const options = props.fish.map((fish) =>
    fish.reduce(function (acc, cur, i) {
      acc[i] = cur;
      return acc;
    }, {})
  );

  const handleInput = (e) => {
    if (e.target.value) {
      let row = props.fish.findIndex((elem) => elem.includes(e.target.value));
      if (row !== -1) {
        navigate(props.fish[row][1], {
          state: { fish: props.fish[row] },
        });
      }
    }
  };

  return (
    <>
      <Autocomplete
        disablePortal
        sx={{
          display: "inline-flex",
          width: "75%",
          background: "white",
          margin: 3,
        }}
        options={options}
        getOptionLabel={(option) => option["0"]}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option["0"]} ({option["1"]})
            </li>
          );
        }}
        onSelect={handleInput}
        renderInput={(params) => <TextField {...params} label="Search..." />}
      />
    </>
  );
}

export default SearchBar;
