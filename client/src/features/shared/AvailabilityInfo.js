import React from "react";
import { Typography } from "@material-ui/core";
function AvailabilityInfo({ availability }) {
  return (
    <>
      {availability && availability < 5 ? (
        <Typography variant="caption" color="secondary">
          Only {availability} left!
        </Typography>
      ) : !availability ? (
        <Typography variant="caption">Out of stock</Typography>
      ) : null}
    </>
  );
}

export default AvailabilityInfo;
