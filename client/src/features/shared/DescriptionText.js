import React from "react";
import { Typography } from "@material-ui/core";
function DescriptionText({ description, maxLength }) {
  return (
    <Typography variant="body2">{`${
      description.length > maxLength
        ? description.slice(0, maxLength).trim() + "..."
        : description
    }`}</Typography>
  );
}

export default DescriptionText;
