const express = require("express");
const router = express.Router();
const Mail_router = require("./Mail.js");

router.use("/mail", Mail_router)

module.exports = router;
