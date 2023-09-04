const express = require("express");
const router = express.Router();
const { event, event_Update, event_Create } = require("../controllers/Events.js");

router.get("/", event);
router.post("/create", event_Create);
router.put("/update", event_Update);

module.exports = router;
