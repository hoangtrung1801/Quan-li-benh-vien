const express = require('express');
const router = express.Router();
const lobbyApiRouter = require('./lobby.api');
const receptionApiRouter = require('./reception.api');
const doctorsApiRouter = require('./doctors.api');
const doctorRoomApiRouter = require('./doctor-room.api');

router.use('/lobby', lobbyApiRouter);
router.use('/reception', receptionApiRouter);
router.use('/doctors', doctorsApiRouter);
router.use('/doctor-room', doctorRoomApiRouter);

router.get('/', (req, res) => {
  res.send("Api hopsital demo");
})

module.exports = router;
