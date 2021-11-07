const express = require('express');
const Diseases = require('../models/Diseases/Diseases');
const Lobby = require('../models/Lobby/Lobby');
const Reception = require('../models/Reception/Reception');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await Lobby.allData); 
})

router.post('/', async (req, res) => {
  const patientData = req.body;
  const disease = await Diseases.findById(patientData.diseaseId);

  patientData.priority = disease.priority;
  patientData.disease = disease.name;

  await Lobby.push(patientData);

  res.json(patientData);
})

router.get('/next', async(req, res) => {
  const patientData = await Lobby.pop();
  await Reception.create(patientData);

  res.json(patientData);
})

module.exports = router;