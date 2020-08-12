import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { fetchDepartmentsList, departmentFilterSet } from "./filtersSlice";
import { Typography, Link } from "@material-ui/core";
import { fetchAllProducts } from "../products/productsSlice";
import { pageChanged } from "../products/productsSlice";

const useStyles = makeStyles((theme) => ({
  title: { marginBottom: theme.spacing(1) },
  departmentLink: {
    cursor: "pointer",
    fontSize: theme.typography.caption.fontSize,
    marginBottom: theme.spacing(0.25),
  },
  departmentsDiv: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0.5, 0, 2, 1),
  },
}));
function DepartmentFilter() {
  const classes = useStyles();
  const departments = useSelector((state) => state.filters.departments);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchDepartmentsList());
  }, [dispatch]);

  const Department = ({ departmentName }) => {
    const handleDepartmentClick = (e) => {
      dispatch(departmentFilterSet(departmentName));
      dispatch(fetchAllProducts());
      dispatch(pageChanged(1));
    };

    return (
      <Link
        underline="none"
        className={classes.departmentLink}
        onClick={handleDepartmentClick}
      >
        {departmentName}
      </Link>
    );
  };

  return (
    <>
      <Typography className={classes.title} variant="body1">
        Departments
      </Typography>
      <div className={classes.departmentsDiv}>
        {departments
          .filter((department, index) => index < 15)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((department, index) => (
            <Department
              key={`department-${index}`}
              departmentName={department.name}
            />
          ))}
      </div>
    </>
  );
}

export default DepartmentFilter;
