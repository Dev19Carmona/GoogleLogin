const express = require("express");
const { Mail_send, Open_window, captureScreenshot, navigateWebPage, getDataFromWebPage } = require("../controllers/Mail.js");
const router = express.Router();

router.get("/send", Mail_send);
router.get("/open", Open_window);
router.get("/screen", captureScreenshot);
router.get("/navigate", navigateWebPage);
router.get("/data", getDataFromWebPage);



module.exports = router;
