const express = require('express');
const Doctor = require('../models/Doctor/Doctor');
const router = express.Router();

router.get('/', async (req, res) => {
  const doctors = await Doctor.allData;
  res.json(doctors);
})

router.get('/:idDoctor', async (req, res) => {
  const {idDoctor} = req.params;
  const doctor = await Doctor.findById(idDoctor);
  res.json(doctor);
})

router.get('/:idDoctor/done', async (req, res) => {
  const { idDoctor } = req.params;
  
  const doctor = await Doctor.findById(idDoctor);
  const patient = doctor.patients.shift();

  await Doctor.update(idDoctor, doctor);

  res.json(patient);
})

module.exports = router;