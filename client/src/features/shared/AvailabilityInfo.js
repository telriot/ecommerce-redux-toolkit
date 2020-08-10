import React from "react";
import { Typography } from "@material-ui/core";
function AvailabilityInfo({ availability, format }) {
  const AvailabilityVariant = ({ format }) => {
    switch (format) {
      case "card":
        return availability && availability < 5 ? (
          <Typography variant="caption" color="secondary">
            Only {availability} left!
          </Typography>
        ) : !availability ? (
          <Typography variant="caption">Out of stock</Typography>
        ) : null;
      case "detail":
        return availability && availability < 5 ? (
          <Typography variant="body1" color="secondary">
            Only {availability} left!
          </Typography>
        ) : !availability ? (
          <Typography variant="body1">Out of stock</Typography>
        ) : (
          <Typography variant="body1" color="primary">
            In stock
          </Typography>
        );
      default:
        return null;
    }
  };
  return <AvailabilityVariant format={format} />;
}

export default AvailabilityInfo;
