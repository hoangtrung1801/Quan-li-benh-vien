const path = require("path");
const Document = require("./Database/Document");

module.exports = () => {
    (async () => {
        const doctor = new Document(path.join(__dirname, "db.json"));
        console.log(await doctor.allData);
    })();
};
