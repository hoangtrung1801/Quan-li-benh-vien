var express = require("express");
const Diseases = require("../models/Diseases/Diseases");
const Doctor = require("../models/Doctor/Doctor");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("admin");
});

router.post("/diseases", async (req, res) => {
    const diseasesData = req.body;
    await Diseases.create(diseasesData);

    res.redirect("/admin");
});

router.post("/doctor", async (req, res) => {
    const doctorData = req.body;
    doctorData.slotCurrent = 0;
    doctorData.patientsId = [];

    await Doctor.create(doctorData);

    res.redirect("/admin");
});

module.exports = router;
