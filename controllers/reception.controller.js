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

    res.render("reception", {
        doctors,
        receptionPatients,
    });
};

module.exports.nextPatient = async (req, res, next) => {
    res.locals.notifies = [];

    const patients = await Reception.allData;
    const doctors = await Doctor.allData;

    for (let i = 0; i < patients.length; i++) {
        let patient = patients[i];
        const specializedDiseaseId = (await Diseases.findById(patient.diseaseId)).specializedId;
        let doctor = doctors.reduce((prev, cur) => {
            if (cur.patients.length >= cur.slotMax) return prev;
            if (cur.specializedId !== specializedDiseaseId) return prev;

            if (!Object.keys(prev).length) return cur;
            if (cur.slotMax - cur.patients.length < prev.slotMax - prev.patients.length) return cur;
            else return prev;
        }, {})


        if (!Object.keys(doctor).length) {
            res.locals.notifies.push(`${patient.name}, please keep in waiting`);
            // await Reception.create(patient); // fix
        } else {
            res.locals.notifies.push(`${patient.name}, please move to ${doctor.name}'s room`);

            await Reception.delete(patient.id);
            doctor.patients.push(patient);
            await Doctor.update(doctor.id, doctor);
        }
    }

    next();
};
