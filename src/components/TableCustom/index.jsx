import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import classes from "./style.module.scss";
import { Link } from "react-router-dom";
import { options } from "../../constants";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableCustom({ head, data, action }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {head?.map((item, idx) => (
              <StyledTableCell key={idx}>{item}</StyledTableCell>
            ))}
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell maxWidth={2} component="th" scope="row">
                <h1>{item.title}</h1>
                <>
                  {item.content.length > 50 ? (
                    <p>
                      {item.content.slice(0, 50)} <Link>...</Link>
                    </p>
                  ) : (
                    <p>{item.content}</p>
                  )}
                </>
              </StyledTableCell>
              <StyledTableCell>{item.category}</StyledTableCell>
              <StyledTableCell>
                {new Date(item.created_date).toLocaleString("en-US", options)}
              </StyledTableCell>
              <StyledTableCell>
                <Box className={classes["action-wrapper"]}>
                  {/* redirect to detail page */}
                  <Link>
                    <Button size="small" variant="outlined">
                      DETAIL
                    </Button>
                  </Link>
                  {/* action pop up delete */}
                  <Box>
                    <Button size="small" variant="outlined">
                      DELETE
                    </Button>
                  </Box>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
