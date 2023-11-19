const express = require("express");
const { Mail_send } = require("../controllers/Mail.js");
const router = express.Router();

router.get("/send", Mail_send);



module.exports = router;
