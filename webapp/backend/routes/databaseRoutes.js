const express = require("express");
const router = express.Router();
const {
  getFishTable,
  getFishListWikipedia,
  getFishWikipedia,
} = require("../database/fishDatabase");

router.get("/table", getFishTable);
router.get("/wikiList", getFishListWikipedia);
router.get("/wikiFish", getFishWikipedia);

module.exports = router;
