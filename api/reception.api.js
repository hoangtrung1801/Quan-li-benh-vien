const express = require('express');
const Diseases = require('../models/Diseases/Diseases');
const Doctor = require('../models/Doctor/Doctor');
const Reception = require('../models/Reception/Reception');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await Reception.allData);
})

router.get('/next', async (req, res) => {
    let notifies = [];

    const patients = await Reception.allData;
    const doctors = await Doctor.allData;

    // each patient find suitable doctor
    for (let i = 0; i < patients.length; i++) {
        let patient = patients[i];
        const specializedDiseaseId = (await Diseases.findById(patient.diseaseId)).specializedId;

        let doctor = doctors.reduce((prev, cur) => {
            // check doctor have slot enough ? , the same specialized ? 
            if (cur.patients.length >= cur.slotMax) return prev;
            if (cur.specializedId !== specializedDiseaseId) return prev;

            // 
            if (!Object.keys(prev).length) return cur;
            if (cur.slotMax - cur.patients.length < prev.slotMax - prev.patients.length) return cur;
            else return prev;
        }, {})


        if (!Object.keys(doctor).length) {
            notifies.push(`${patient.name}, please keep in waiting`);
        } else {
            notifies.push(`${patient.name}, please move to ${doctor.name}'s room`);

            await Reception.delete(patient.id);

            doctor.patients.push(patient);
            await Doctor.update(doctor.id, doctor);
        }
    }

    res.json({
      notifies
    })
})

module.exports = router;