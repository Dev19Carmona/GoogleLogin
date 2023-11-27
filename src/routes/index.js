const express = require("express");
const router = express.Router();
const Mail_router = require("./Mail.js");
const Auth_router = require("./Auth.js");

router.use("/mail", Mail_router)
router.use("/auth", Auth_router)

module.exports = router;
