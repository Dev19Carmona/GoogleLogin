const Debts = require("../models/Debts.js");
const Event = require("../models/Events.js");
const { v4: uuidv4 } = require("uuid");
const { getDateInfo } = require("./functions/date.js");
const { employee } = require("./Employee.js");

const debts = async (req, res) => {
  let query = {};
  const { month, employeeId } = req.body;
  if (month) query.month = month;
  if (employeeId) query.employeeId = employeeId;
  const debts = await Debts.find(query);
  res.status(200).json(debts);
};

const debts_Create = async (req, res) => {
  try {
    const {
      debts = [],
      extraData: { eventId, month, year },
    } = req.body;
    if (!debts && !Array.isArray(debts) && debts.length <= 0)
      throw new Error("DEBTS_IS_NOT_VALID");
    const insert = debts.map((debt) => ({
      _id: uuidv4(),
      employeeId: debt.employeeId,
      eventId,
      month,
      year,
      unpaid: debt.total,
      total: debt.total,
    }));
    const newDebts = await Debts.insertMany(insert);
    res.status(200).json(newDebts);
  } catch (error) {
    res.status(500).send("SERVER_ERROR");
  }
};
const debts_Pay = async (req, res) => {
  try {
    const { _id, paymentAmount } = req.body;
    const debt = await Debts.findOne({ _id });

    if (!debt) throw new Error("DEBT_NOT_FOUND");
    if (debt.unpaid - paymentAmount < 0)
      throw new Error("UNPAID_CANNOT_BE_LESS_THAN_ZERO");

    debt.payments.push({
      date: new Date(),
      value: paymentAmount,
    });

    if(debt.unpaid - paymentAmount === 0) debt.isPaid = true
    debt.unpaid = debt.unpaid - paymentAmount;

    await debt.save();
    await Event.findOneAndUpdate(
      { _id: debt.eventId },
      { $inc: { paid: paymentAmount } }
    );
    res.status(200).json(debt);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.toString());
  }
};
const debts_Update = async (req, res) => {
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

module.exports = { debts, debts_Create, debts_Update, debts_Pay };
