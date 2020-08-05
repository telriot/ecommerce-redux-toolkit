import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomPagination({ totalPages, currentPage, handleChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        page={currentPage}
        onChange={(e, page) => handleChange(e, page)}
        count={totalPages}
        shape="rounded"
      />
    </div>
  );
}

export default CustomPagination;
