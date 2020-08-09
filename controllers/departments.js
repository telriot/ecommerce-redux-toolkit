const Department = require("../models/Department");

module.exports = {
  getAllDepartments: async (req, res, next) => {
    const departments = await Department.find();
    res.send(departments);
  },
  getDepartmentsList: async (req, res, next) => {
    const departments = await Department.find();
    const resObj = departments.map((department) => ({
      name: department.name,
      productsNumber: department.products.length,
    }));
    res.status(200).send(resObj);
  },
};
