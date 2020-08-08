import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { textFilterSet } from "../features/filters/filtersSlice";
import { fade, makeStyles } from "@material-ui/core/styles";
import { IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  fetchAllProducts,
  pageChanged,
} from "../features/products/productsSlice";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    flexGrow: 0.5,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(1),
    borderRadius: 0,
    height: "100%",
    position: "absolute",
    right: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));
function SearchInput() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSearchBarChange = (e) => {
    dispatch(textFilterSet(e.target.value));
  };
  const handleSearchKeyUp = (e) => {
    if (e.keyCode === 13) {
      console.log("search");
      dispatch(fetchAllProducts());
      dispatch(pageChanged(1));
    }
  };
  const handleSearchIconClick = () => {
    console.log("search");
    dispatch(fetchAllProducts());
    dispatch(pageChanged(1));
  };
  return (
    <div className={classes.search}>
      <div>
        <IconButton
          size="small"
          className={classes.searchIcon}
          onClick={handleSearchIconClick}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <InputBase
        placeholder="Search…"
        onChange={handleSearchBarChange}
        onKeyUp={handleSearchKeyUp}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{
          "aria-label": "search",
        }}
      />
    </div>
  );
}

export default SearchInput;
