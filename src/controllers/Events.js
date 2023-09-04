const Event = require("../models/Events.js");
const { v4: uuidv4 } = require("uuid");
const { getDateInfo } = require("./functions/date.js");
const { debts_Create } = require("./Debts.js");

const event = async (req, res) => {
  let query = {};
  const { month } = req.body;
  if (month) query = { "dateInfo.month": month };
  const events = await Event.find(query);
  res.status(200).json(events);
};

const event_Create = async (req, res) => {
  try {
    const { name, date, total, employeeIds = [] } = req.body;
    
    const dateInfo = getDateInfo(date);
    const insert = {
      _id: uuidv4(),
      name,
      dateInfo,
      total
    };


    const newEvent = await new Event(insert).save();
    if (employeeIds.length > 0) await debts_Create(req, res)
    res.status(200).json(newEvent);
  } catch (error) {
    res.status(500).send("SERVER_ERROR");
  }
};
const event_Update = async (req, res) => {
  try {
    const { _id, name, birthdate } = req.body;
    const birthdateInfo = dateInfo(birthdate);
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

module.exports = { event, event_Create, event_Update };
