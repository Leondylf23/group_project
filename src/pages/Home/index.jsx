import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoadingContainer from "../../components/LoadingContainer";
import classes from "./style.module.scss";

export default function Home({ category }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.createBtnContainer}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className={classes.button}
          onClick={() => openCreateNewModal()}
        >
          Create New
        </Button>
      </div>
      {isLoading ? <LoadingContainer isFullHeight={true} /> : <h1>test</h1>}
    </div>
  );
}
