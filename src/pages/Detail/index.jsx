import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import classes from "./style.module.scss";
import { callApiLocal } from "../../domain/api";
import NoteModal from "../../components/NoteModal";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [noteDetail, setNoteDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteNoteHandler = async (id) => {
    try {
      await callApiLocal(`/brief_notes/${id}`, "DELETE");
      console.log("Success delete notes with id of", id);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const editNoteHandler = (id) => {
    console.log("Edit", id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!id) return;

    const getNotesDetail = async () => {
      setIsLoading(true);
      try {
        const response = await callApiLocal(`/brief_notes/${id}`, "GET");

        setNoteDetail([response]);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };

    getNotesDetail();
  }, [id]);

  return (
    <Container className={classes.container}>
      {!isLoading ? (
        noteDetail?.length > 0 ? (
          noteDetail?.map((data) => {
            const time = new Date(data.created_date).toLocaleTimeString();
            const date = new Date(data.created_date).toDateString("en-GB");
            return (
              <Paper
                key={data.id}
                elevation={3}
                className={
                  classes.container__inner +
                  " " +
                  (data?.category === "work"
                    ? classes.work
                    : data?.category === "family"
                    ? classes.family
                    : classes.personal)
                }
              >
                <Box className={classes.title_wrapper}>
                  <Typography className={classes.title}>
                    {data.title}
                  </Typography>
                  <Chip
                    variant="outlined"
                    label={data.category}
                    className={classes.chip}
                  ></Chip>
                </Box>
                <Typography className={classes.date}>
                  {date} {time}
                </Typography>
                <Typography className={classes.content}>
                  {data.content}
                </Typography>
                <Box className={classes.btn_wrapper}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteNoteHandler(data.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.btn_edit}
                    onClick={() => {
                      editNoteHandler(data.id);
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </Paper>
            );
          })
        ) : (
          <Typography variant="h4" className={classes.text_not_found}>
            No Notes Found with id of {id}
          </Typography>
        )
      ) : (
        <CircularProgress />
      )}

      {isModalOpen && (
        <NoteModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          editId={id}
        />
      )}
    </Container>
  );
};

export default Detail;
