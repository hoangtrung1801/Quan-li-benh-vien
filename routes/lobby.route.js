const express = require("express");
const {
    getPage,
    checkIn,
    nextPatient,
} = require("../controllers/lobby.controller");
const checkReceptionFull = require("../middlewares/checkReceptionFull");
const medicalRegisterValidate = require("../middlewares/validates/medicalRegister.validate");

const router = express.Router();

/* GET home page. */
router.get("/", checkReceptionFull, getPage);
router.post("/submit", medicalRegisterValidate, checkIn, getPage);
router.post("/", nextPatient);

module.exports = router;
