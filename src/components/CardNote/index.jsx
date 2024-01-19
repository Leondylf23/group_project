import React from "react";
import classes from "./style.module.scss";
import { Link } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import FaceIcon from "@mui/icons-material/Face";
import { options } from "../../constants";

const CardNote = ({ data }) => {
  return (
    <div className={classes.mainContainer}>
      {data.map((item, idx) => (
        <div
          key={idx}
          className={
            classes.cardContainer +
            " " +
            (item.category === "work"
              ? classes.work
              : item.category === "family"
              ? classes.family
              : classes.personal)
          }
        >
          <div>
            <div
              className={
                classes.cardLogo +
                " " +
                (item.category === "work"
                  ? classes.logoWork
                  : item.category === "family"
                  ? classes.logoFamily
                  : classes.logoPersonal)
              }
            >
              <span>
                $
                {item.category === "work" ? (
                  <WorkIcon />
                ) : item.category === "family" ? (
                  <FamilyRestroomIcon />
                ) : (
                  <FaceIcon />
                )}
              </span>
            </div>
            <div className={classes.noteWrapper}>
              <Link to={`/${item.id}`}>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </Link>
              <>
                {item.content.length > 100 ? (
                  <p>
                    {item.content.slice(0, 100)}
                    <Link to={`/${item.id}`}>...</Link>
                  </p>
                ) : (
                  <p>{item.content}</p>
                )}
              </>
            </div>
          </div>

          <p>{new Date(item.created_date).toLocaleString("en-US", options)}</p>
        </div>
      ))}
    </div>
  );
};

export default CardNote;
