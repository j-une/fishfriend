const express = require("express");
const router = express.Router();
const {
  getCommands,
  sendCommands,
} = require("../controllers/commandsController");

router.get("/", getCommands);

router.post("/", sendCommands);

module.exports = router;
