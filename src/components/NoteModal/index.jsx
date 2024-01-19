import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
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

const NoteModal = ({ isOpen, setIsOpen }) => {
  const [noteInput, setNoteInput] = useState({});

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // TODO: Get Logged user_id
    const data = {
      id: uuidv4(),
      user_id: "1",
      title: noteInput.title,
      content: noteInput.content,
      category: noteInput.category,
      created_date: new Date(),
    };

    try {
      await callApiLocal("/brief_notes", "POST", {}, {}, data);
      setIsOpen(false);
      location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Modal
      open={isOpen}
      className={classes.container}
      onClose={() => setIsOpen(false)}
    >
      <Fade in={isOpen}>
        <Box className={classes.container__inner}>
          <Typography variant="h5" className={classes.form_header}>
            Add Notes
          </Typography>
          <form onSubmit={submitHandler}>
            <Box className={classes.input_wrapper}>
              <FormLabel className={classes.form_label}>Title</FormLabel>
              <TextField
                fullWidth
                required
                defaultValue=""
                placeholder="Title"
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
              <Select
                defaultValue=""
                value={noteInput.category}
                className={classes.input_select}
                onChange={(e) =>
                  setNoteInput((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              >
                <MenuItem value="" disabled>
                  Category
                </MenuItem>
                <MenuItem value="family">Family</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="work">Work</MenuItem>
              </Select>
            </Box>
            <Box className={classes.input_wrapper}>
              <FormLabel className={classes.form_label}>Content</FormLabel>
              <TextField
                fullWidth
                required
                defaultValue=""
                placeholder="Content"
                multiline
                type="text"
                variant="outlined"
                onChange={(e) =>
                  setNoteInput((prev) => ({ ...prev, content: e.target.value }))
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
    </Modal>
  );
};

export default NoteModal;
