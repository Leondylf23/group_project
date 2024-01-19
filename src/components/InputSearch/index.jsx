import React from "react";
import classes from "./style.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

const InputSearch = ({ setter, action }) => {
  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        className={classes.icon}
        onClick={() => action()}
      >
        <SearchIcon />
      </Button>

      <input type="text" onChange={(e) => setter(e.target.value)} />
    </div>
  );
};

export default InputSearch;
