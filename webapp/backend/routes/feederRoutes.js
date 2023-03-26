const express = require("express");
const router = express.Router();
const {
  sendFeederInterval,
  getFeederInterval,
} = require("../controllers/feederController");

router.get("/", getFeederInterval);
router.post("/", sendFeederInterval);

module.exports = router;
