import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import classes from "./style.module.scss";
import NoteModal from "../../components/NoteModal";
import LoadingContainer from "../../components/LoadingContainer";

export default function Home({ category }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateNewModal = () => {
    setIsModalOpen(true);
  };

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

      {isModalOpen && (
        <NoteModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </div>
  );
}
