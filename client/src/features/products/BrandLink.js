import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { brandFilterImperativelySet } from "../filters/filtersSlice";

const useStyles = makeStyles((theme) => ({
  link: { cursor: "pointer" },
}));
function BrandLink({ brand }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleBrandLink = () => {
    history.push("/");
    dispatch(brandFilterImperativelySet(brand));
  };

  return (
    <Typography variant="caption">
      by{" "}
      <MuiLink className={classes.link} onClick={handleBrandLink}>
        {brand}
      </MuiLink>
    </Typography>
  );
}

export default BrandLink;
