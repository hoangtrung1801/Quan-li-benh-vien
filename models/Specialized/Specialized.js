const path = require("path");
const Document = require("../../Database/Document");
const Specialized = new Document(path.join(__dirname, "/Specialized.json"));

// validate
// create schema

/*
    Schema :
    + ID
    + name
*/

module.exports = Specialized;
