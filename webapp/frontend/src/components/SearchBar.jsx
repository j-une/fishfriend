import { TextField } from "@mui/material";

function SearchBar() {
  return (
    <TextField
      label="Search..."
      variant="outlined"
      sx={{ width: "75%", background: "white", margin: 3 }}
    />
  );
}

export default SearchBar;
