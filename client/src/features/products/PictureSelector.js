import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  selectorDiv: { display: "flex", flexDirection: "column" },
  imgThumbnail: {
    border: "1px solid gray",
    height: "3rem",
    width: "3rem",
    marginBottom: theme.spacing(1),
    borderRadius: "4px",
    "&:hover,&:focus": {
      outline: "none",
      border: "1px solid gray",
      boxShadow: `0px 0px 3px 2px rgba(197, 17, 98, .7)`,
    },
  },
}));
function PictureSelector({ setPicture, thumbs }) {
  const classes = useStyles();
  const handleMouseEnter = (index) => () => {
    setPicture(index);
  };
  return (
    <div className={classes.selectorDiv}>
      {thumbs.map((thumb, index) => (
        <img
          alt={`thumb-${index}`}
          tabIndex={1}
          className={classes.imgThumbnail}
          key={`thumbnail-${index}`}
          src={thumb}
          onMouseEnter={handleMouseEnter(index)}
        />
      ))}
    </div>
  );
}

export default PictureSelector;
