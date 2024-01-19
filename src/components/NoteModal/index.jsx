import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import classes from "./style.module.scss";
import { callApiLocal } from "../../domain/api";
import { useMainContext } from "../MainContext";

const NoteModal = ({ isOpen, setIsOpen, editId = null }) => {
  const { mainData } = useMainContext();

  const [noteInput, setNoteInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const closeModalHandler = () => {
    setIsOpen(false);
    setNoteInput({});
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      id: uuidv4(),
      user_id: mainData.id,
      title: noteInput.title,
      content: noteInput.content,
      category: noteInput.category,
      created_date: new Date(),
    };

    if (editId) {
      // PATCH
      try {
        await callApiLocal(`/brief_notes/${editId}`, "PATCH", {}, {}, data);
        setIsOpen(false);
        location.reload();
      } catch (err) {
        console.log(err.message);
      }
    } else {
      // POST
      try {
        await callApiLocal("/brief_notes", "POST", {}, {}, data);
        setIsOpen(false);
        location.reload();
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const getNotesDetail = async () => {
      setIsLoading(true);
      try {
        const response = await callApiLocal(`/brief_notes/${editId}`, "GET");
        setNoteInput({
          id: editId,
          user_id: response.user_id,
          title: response.title,
          content: response.content,
          category: response.category,
          created_date: response.created_date,
        });
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };

    getNotesDetail();
  }, []);

  return (
    <Modal
      open={isOpen}
      className={classes.container}
      onClose={() => setIsOpen(false)}
    >
      {!isLoading ? (
        <Fade in={isOpen}>
          <Box className={classes.container__inner}>
            <Typography variant="h5" className={classes.form_header}>
              {editId ? "Edit" : "Add"} Notes
            </Typography>
            <form onSubmit={submitHandler}>
              <Box className={classes.input_wrapper}>
                <FormLabel className={classes.form_label}>Title</FormLabel>
                <TextField
                  fullWidth
                  required
                  defaultValue=""
                  placeholder="Input title..."
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    setNoteInput((prev) => ({ ...prev, title: e.target.value }))
                  }
                  value={noteInput.title}
                />
              </Box>
              <Box className={classes.input_wrapper}>
                {/* TODO: Add Placeholder */}
                <FormLabel className={classes.form_label}>Category</FormLabel>
                <TextField
                  select
                  defaultValue=""
                  value={noteInput?.category}
                  className={classes.input_select}
                  onChange={(e) =>
                    setNoteInput((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="family">Family</MenuItem>
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                </TextField>
              </Box>
              <Box className={classes.input_wrapper}>
                <FormLabel className={classes.form_label}>Content</FormLabel>
                <TextField
                  fullWidth
                  required
                  defaultValue=""
                  placeholder="Input content..."
                  multiline
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    setNoteInput((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  value={noteInput.content}
                />
              </Box>
              <Box className={classes.btn_wrapper}>
                <Button variant="outlined" onClick={closeModalHandler}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.btn_submit}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      ) : (
        <CircularProgress />
      )}
    </Modal>
  );
};

export default NoteModal;
