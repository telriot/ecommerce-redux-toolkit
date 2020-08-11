import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  returnLinkDiv: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(2),
  },
  backArrow: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.palette.primary.main,
    transform: "translateY(-1px)",
  },
  returnLink: {
    fontSize: theme.typography.caption.fontSize,
    cursor: "pointer",
    width: "max-content",
  },
}));

function BackLink() {
  const classes = useStyles();
  const history = useHistory();
  const handleBackLinkClick = () => {
    history.goBack();
  };

  return (
    <div className={classes.returnLinkDiv}>
      <ArrowBackIosIcon className={classes.backArrow} />
      <MuiLink
        className={classes.returnLink}
        variant="caption"
        onClick={handleBackLinkClick}
      >
        Back to results
      </MuiLink>
    </div>
  );
}

export default BackLink;
