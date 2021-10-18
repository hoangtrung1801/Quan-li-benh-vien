var express = require("express");
const {
    getPageListDoctor,
    getPageDoctor,
    donePatient,
} = require("../controllers/doctor-room.controller");
var router = express.Router();

/* GET home page. */
router.get("/", getPageListDoctor);

router.get("/:idDoctor", getPageDoctor);
router.get("/:idDoctor/done", donePatient);

module.exports = router;
