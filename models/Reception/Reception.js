const path = require("path");
const Document = require("../../Database/Document");
const Reception = new Document(path.join(__dirname, "/Reception.json"));

module.exports = Reception;
