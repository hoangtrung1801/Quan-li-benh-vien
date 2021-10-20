const Doctor = require("../models/Doctor/Doctor");

module.exports.getPageListDoctor = async (req, res) => {
    const doctors = await Doctor.allData;
    res.render("list-doctor-room", {
        doctors,
    });
};

module.exports.getPageDoctor = async (req, res) => {
    const {idDoctor} = req.params;
    const doctor = await Doctor.findById(idDoctor);
    res.render("doctor-room", {
        doctor,
    });
};

module.exports.donePatient = async (req, res) => {
    const {idDoctor} = req.params;

    const doctor = await Doctor.findById(idDoctor);
    doctor.patients.shift();
    await Doctor.update(idDoctor, doctor);

    res.redirect(`/doctor-room/${idDoctor}`);
};
