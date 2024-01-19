import { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import classes from "./style.module.scss";
import NoteModal from "../../components/NoteModal";
import LoadingContainer from "../../components/LoadingContainer";
import CardNote from "../../components/CardNote";
import TableCustom from "../../components/TableCustom";
import { headTable } from "../../constants";
import InputSearch from "../../components/InputSearch";
import InputFilter from "../../components/InputFilter";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { categoryList } from "../../constants";
import { useMainContext } from "../../components/MainContext";
import { callApiLocal } from "../../domain/api";
import { useSearchParams } from "react-router-dom";
import { useMessage } from "../../components/AlertPopup";

export default function Home({ category }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datas, setDatas] = useState([]);
  const [title, setTitle] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const filterCategory = searchParams.get("category");
  const { setPage } = useMainContext();
  const { mainData } = useMainContext();

  const fetchData = async () => {
    try {
      const response = await callApiLocal(
        `/brief_notes`,
        "GET",
        {},
        { user_id: mainData?.id }
      );
      setDatas(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async (cat) => {
    try {
      if (filterCategory === "" || cat === "") {
        fetchData();
        cat = filterCategory;
      }

      const response = await callApiLocal(
        `/brief_notes`,
        "GET",
        {},
        { user_id: mainData?.id, category: cat }
      );
      setDatas(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      if (filterCategory === "") {
        fetchData();
      }

      const response = await callApiLocal(
        `/brief_notes`,
        "GET",
        {},
        { user_id: mainData?.id, title: title }
      );
      setDatas(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPage("Home");
    fetchData();
  }, [category, mainData]);

  const openCreateNewModal = () => {
    setIsModalOpen(true);
  };
  const [switchDisplay, setSwitchDisplay] = useState(false);

  const onSwitch = () => {
    setSwitchDisplay(!switchDisplay);
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
        {isModalOpen && (
          <NoteModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        )}
      </div>

      {isLoading ? (
        <LoadingContainer isFullHeight={true} />
      ) : (
        <>
          <div className={classes.headerAction}>
            <InputSearch setter={setTitle} action={handleSearch} />
            <InputFilter
              options={categoryList}
              setter={setSearchParams}
              action={handleFilter}
            />
            <Button onClick={() => onSwitch()}>
              {switchDisplay ? <FormatListBulletedIcon /> : <GridViewIcon />}
            </Button>
          </div>

          {datas.length === 0 ? (
            <h1>kosong</h1>
          ) : switchDisplay ? (
            <div className={classes.tableContainer}>
              <TableCustom head={headTable} data={datas} />
            </div>
          ) : (
            <CardNote data={datas} />
          )}
        </>
      )}
    </div>
  );
}
