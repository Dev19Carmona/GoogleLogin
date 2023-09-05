const Event = require("../models/Events.js");
const { v4: uuidv4 } = require("uuid");
const { getDateInfo } = require("./functions/date.js");
const { debts_Create } = require("./Debts.js");

const event = async (req, res) => {
  try {
    let query = {};
    const { month, year } = req.body;
    if (month && year) {
      query = {
        "dateInfo.month": month,
        "dateInfo.year": year,
      };
    } else if (month) {
      query = { "dateInfo.month": month };
    } else if (year) {
      query = { "dateInfo.year": year };
    }
    const events = await Event.find(query);
    if (events.length < 1) throw new Error("EVENT_NOT_FOUND");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

const event_Create = async (req, res) => {
  try {
    const { name, date, total, employeeIds = [], fee } = req.body;

    const dateInfo = getDateInfo(date);
    const insert = {
      _id: uuidv4(),
      name,
      dateInfo,
      total,
      fee,
    };

    const newEvent = await new Event(insert).save();

    if (employeeIds.length > 0) {
      const debts = employeeIds.map(employeeId => ({
        employeeId,
        total:fee
      }))
      const extraData = {
        eventId:newEvent._id,
        month:dateInfo.month,
        year:dateInfo.year,
      }
      req.body = {
        debts,
        extraData
      }
      await debts_Create(req);
    }

    res.status(200).json(newEvent);
  } catch (error) {
    res.status(500).send("SERVER_ERROR");
  }
};
const event_Update = async (req, res) => {
  try {
    const { _id, name, birthdate } = req.body;
    let update = {};
    let birthdateInfo;
    if (birthdate) {
      birthdateInfo = dateInfo(birthdate);
      update.birthdateInfo = birthdateInfo;
    }
    if (name) update.name = name;
    const eventUpdated = await Event.findByIdAndUpdate(
      _id,
      update,
      {
        new: true,
      }
    );
    if (!eventUpdated) {
      res.status(404).send("Event NOT Found");
    } else {
      res.status(200).json(eventUpdated);
    }
  } catch (error) {
    res.status(500).send("Can't update Event");
  }
};

module.exports = { event, event_Create, event_Update };
