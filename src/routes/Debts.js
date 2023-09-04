const express = require("express");
const router = express.Router();
const { debts, debts_Create, debts_Update, debts_Pay } = require("../controllers/Debts.js");

router.get("/", debts);
router.post("/create", debts_Create);
router.put("/update", debts_Update);
router.patch("/pay", debts_Pay);

module.exports = router;
