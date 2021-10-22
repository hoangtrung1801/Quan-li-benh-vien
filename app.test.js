const Diseases = require("./models/Diseases/Diseases");
const QueueDocument = require('./Database/QueueDocument');
const Lobby = require('./models/Lobby/Lobby');
const Reception = require("./models/Reception/Reception");
const Doctor = require("./models/Doctor/Doctor");

module.exports = async () => {
    // const patients = await Reception.allData;
    // const doctors = await Doctor.allData;

    // for (let patient of patients) {
    //     const specializedDiseaseId = (await Diseases.findById(patient.diseaseId)).specializedId;
    //     let doctor = doctors.reduce((prev, cur) => {
    //         if (cur.patients.length >= cur.slotMax) return prev;
    //         if (cur.specializedId !== specializedDiseaseId) return prev;

    //         if (!Object.keys(prev).length) return cur;
    //         if (cur.slotMax - cur.patients.length < prev.slotMax - prev.patients.length) return cur;
    //         else return prev;
    //     }, {})

    //     if (!Object.keys(doctor).length) console.log('not suitable');
    //     else console.log(patient, 'with', doctor, '----------');
    // }
};
