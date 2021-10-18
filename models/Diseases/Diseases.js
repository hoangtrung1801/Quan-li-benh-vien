const path = require("path");
const Document = require("../../Database/Document");
const Diseases = new Document(path.join(__dirname, "/Diseases.json"));

// validate
// create schema

/*
    Schema :
    + Id
    + name
    + specializedId
    + priority
*/

module.exports = Diseases;
