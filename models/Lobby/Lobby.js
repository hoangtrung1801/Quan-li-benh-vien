const path = require("path");
const QueueDocument = require("../../Database/QueueDocument");
const Lobby = new QueueDocument(path.join(__dirname, "/Lobby.json"), (data) => {
    return parseInt(data.priority) + data.date / 1e13;
});

module.exports = Lobby;
