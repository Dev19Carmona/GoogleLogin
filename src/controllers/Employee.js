const Employee = require("../models/Employee.js");
const { v4: uuidv4 } = require("uuid");
const { getDateInfo } = require("./functions/date.js");

const employee = async (req, res) => {
  let query = {};
  const { month } = req.body;
  if (month) query = { "birthdateInfo.month": month };
  const employees = await Employee.find(query);
  res.status(200).json(employees);
};

const employee_Create = async (req, res) => {
  try {
    const { name, birthdate } = req.body;
    const birthdateInfo = getDateInfo(birthdate);
    const insert = {
      _id: uuidv4(),
      name,
      birthdateInfo,
    };

    const newEmployee = await new Employee(insert).save();
    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(500).send("SERVER_ERROR");
  }
};
const employee_Update = async (req, res) => {
  try {
    const { _id, name, birthdate } = req.body;
    const birthdateInfo = getDateInfo(birthdate);
    const employeeUpdated = await Employee.findByIdAndUpdate(
      _id,
      {
        name,
        birthdateInfo,
      },
      {
        new: true,
      }
    );
    if (!employeeUpdated) {
      res.status(404).send("Employee NOT Found");
    } else {
      res.status(200).json(employeeUpdated);
    }
  } catch (error) {
    res.status(500).send("Can't update User");
  }
};

module.exports = { employee, employee_Create, employee_Update };
