import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider } from "@material-ui/core";
import ScrollerCard from "../shared/ScrollerCard";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    minWidth: "16rem",
  },
}));

function RecentlyViewed({ maxItems }) {
  const classes = useStyles();
  const recentViews = useSelector((state) => state.recentViews.recentViews);

  return (
    <Paper data-testid="component-recently-viewed" className={classes.paper}>
      {" "}
      <Typography className={classes.title}>Recently viewed items</Typography>
      {recentViews
        .filter((item, index) => index < maxItems)
        .map((product, index) => (
          <div key={`scroller-${index}`}>
            {index !== 0 && <Divider />}
            <ScrollerCard product={product} variant="vertical" />
          </div>
        ))}
    </Paper>
  );
}

export default RecentlyViewed;
