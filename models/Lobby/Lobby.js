const path = require("path");
const QueueDocument = require("../../Database/QueueDocument");
const Lobby = new QueueDocument(path.join(__dirname, "/Lobby.json"));

module.exports = Lobby;
