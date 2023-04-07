import React from "react";

import SearchIcon from "@mui/icons-material/Search";

import TextField from "@mui/material/TextField";

// render

const Search = ({ setSearch }) => {
  return (
    <TextField
      label="Filter with..."
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        endAdornment: <SearchIcon />,
      }}
      style={{ margin: 20 }}
      fullWidth
    />
  );
};

export default Search;
