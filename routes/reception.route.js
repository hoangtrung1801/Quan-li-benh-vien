var express = require("express");
const {getPage, nextPatient} = require("../controllers/reception.controller");
var router = express.Router();

/* GET home page. */
router.get("/", getPage);
router.post("/", nextPatient, getPage);

module.exports = router;
