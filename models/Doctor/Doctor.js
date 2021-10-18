const path = require("path");
const Document = require("../../Database/Document");

// validate
// create schema

/*
    Schema :
    + ID
    + name
    + slotMax
    + specializedId
    + patientsId
*/

const Doctor = new Document(path.join(__dirname, "/Doctor.json"));

module.exports = Doctor;
