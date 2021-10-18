const Diseases = require("../models/Diseases/Diseases");
const Doctor = require("../models/Doctor/Doctor");
const Reception = require("../models/Reception/Reception");
const Specialized = require("../models/Specialized/Specialized");

module.exports.getPage = async (req, res) => {
    let doctors = await Doctor.allData;
    const receptionPatients = await Reception.allData;

    doctors.sort((a, b) => {
        if (a.slotMax - a.patients.length <= 0) return 1;
        if (b.slotMax - b.patients.length <= 0) return -1;
        return a.slotMax - a.patients.length > b.slotMax - b.patients.length
            ? 1
            : -1;
    });
    console.log(res.locals);

    res.render("reception", {
        doctors,
        receptionPatients,
    });
};

module.exports.nextPatient = async (req, res, next) => {
    const doctors = await Doctor.allData;

    const patient = await Reception.pop_front();
    const specializedDiseaseId = (await Diseases.findById(patient.diseaseId))
        .specializedId;
    const doctor = doctors
        .filter((doctor) => {
            if (doctor.patients.length >= doctor.slotMax) return false;
            return doctor.specializedId === specializedDiseaseId;
        }) // filter
        .sort((a, b) => {
            if (a.slotMax - a.patients.length <= 0) return 1;
            if (b.slotMax - b.patients.length <= 0) return -1;
            return a.slotMax - a.patients.length > b.slotMax - b.patients.length
                ? 1
                : -1;
        })[0]; // sort
    // reduce for good performance

    try {
        if (!doctor) {
            console.log(`${patient.name} can not find suitable doctor`)
            res.locals.notifies = [`${patient.name}, please keep in waiting`];
            await Reception.create(patient);
        } else {
            console.log(`${patient.name} go to doctor ${doctor.name}}`);
            res.locals.notifies = [`${patient.name}, please move to ${doctor.name}'s room`];
            doctor.patients.push(patient);
            await Doctor.update(doctor.id, doctor);
        }
    } catch (e) {
        console.log(`Error in reception : ${e}`);
    }

    next();
};
