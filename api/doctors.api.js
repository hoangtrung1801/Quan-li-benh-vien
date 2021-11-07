const express = require('express');
const Doctor = require('../models/Doctor/Doctor');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await Doctor.allData);
})

module.exports = router;