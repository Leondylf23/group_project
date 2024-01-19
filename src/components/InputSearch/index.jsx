import React from "react";
import classes from "./style.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

const InputSearch = () => {
  return (
    <div className={classes.container}>
      <Button variant="contained" className={classes.icon}>
        <SearchIcon />
      </Button>

      <input type="text" />
    </div>
  );
};

export default InputSearch;
