import { useState } from "react";
import { Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoadingContainer from "../../components/LoadingContainer";
import classes from "./style.module.scss";
import CardNote from "../../components/CardNote";
import TableCustom from "../../components/TableCustom";
import { headTable } from "../../constants";
import InputSearch from "../../components/InputSearch";
import InputFilter from "../../components/InputFilter";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { categoryList } from "../../constants";

const data = [
  {
    title: "test brief 1",
    content: "ini test brief",
    category: "work",
    created_date: "2023-01-01T00:00:00",
  },
  {
    title: "test brief 2",
    content: "ini test brief",
    category: "personal",
    created_date: "2023-01-01T00:00:00",
  },
  {
    title: "test brief 3",
    content: "ini test brief",
    category: "family",
    created_date: "2023-01-01T00:00:00",
  },
  {
    title: "test brief 4",
    content: "ini test brief",
    category: "personal",
    created_date: "2023-01-01T00:00:00",
  },
  {
    title: "test brief 5",
    content:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates repudiandae eum veniam vitae odio deleniti, quia facere? Voluptates fugiat saepe minus eligendi atque facere veniam nobis unde tempore. Laborum maxime itaque minus, officia architecto quis a asperiores reprehenderit assumenda aut, quasi dolor explicabo dolorem, error eius minima dolore deserunt quam? Accusantium minus voluptatibus ullam eligendi obcaecati perspiciatis nobis error qui suscipit. Magnam esse dolorem reprehenderit repellendus eaque. Numquam, suscipit consequuntur?",
    category: "work",
    created_date: "2023-01-01T00:00:00",
  },
];

export default function Home({ category }) {
  const [isLoading, setIsLoading] = useState(false);
  const [switchDisplay, setSwitchDisplay] = useState(false);
  const [data, setData] = useState([]);

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
        >
          Create New
        </Button>
      </div>
      {isLoading ? (
        <LoadingContainer isFullHeight={true} />
      ) : (
        <>
          <div className={classes.headerAction}>
            <InputSearch />
            <InputFilter options={categoryList} />
            <Button onClick={() => onSwitch()}>
              {switchDisplay ? <FormatListBulletedIcon /> : <GridViewIcon />}
            </Button>
          </div>

          {switchDisplay ? (
            <div className={classes.tableContainer}>
              <TableCustom head={headTable} data={data} />
            </div>
          ) : (
            <CardNote data={data} />
          )}
        </>
      )}
    </div>
  );
}
