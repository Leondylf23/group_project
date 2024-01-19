import React from "react";
import classes from "./style.module.scss";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button } from "@mui/material";

const InputFilter = ({ options }) => {
  return (
    <div className={classes.container}>
      <Button variant="contained">
        <FilterListIcon />
      </Button>
      <select>
        <option value="">Category</option>
        {options.map((opt, idx) => (
          <>
            <option key={idx} value={opt.id}>
              {opt.name}
            </option>
          </>
        ))}
      </select>
    </div>
  );
};

export default InputFilter;
