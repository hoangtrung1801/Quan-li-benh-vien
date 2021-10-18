const Diseases = require("../models/Diseases/Diseases");
const Reception = require("../models/Reception/Reception");
const Lobby = require("../models/Lobby/Lobby");

module.exports.getPage = async (req, res) => {
    const diseases = await Diseases.allData;
    const lobbyPatients = await Lobby.allData;

    res.locals.warning = req.query.warning;

    res.render("lobby", {
        diseases,
        lobbyPatients,
    });
};

module.exports.checkIn = async (req, res, next) => {
    if (res.locals.warning) {
        res.redirect(`/lobby?warning=${res.locals.warning}`)
    } else {
        const patientData = req.body;
        const disease = await Diseases.findById(patientData.diseaseId);
        patientData.priority = disease.priority;
        patientData.disease = disease.name;
        await Lobby.push(patientData);

        res.redirect('/lobby');
    }
};

module.exports.nextPatient = async (req, res) => {
    const patientData = await Lobby.pop();
    await Reception.create(patientData);

    res.redirect("back");
};