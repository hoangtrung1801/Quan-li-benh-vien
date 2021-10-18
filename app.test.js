const Lobby = require("./models/Lobby/Lobby");
const Doctor = require("./models/Doctor/Doctor");
const Diseases = require("./models/Diseases/Diseases");
module.exports = async () => {
    // for (let i = 65; i <= 75; i++) {


    //     let name = String.fromCharCode(i);
    //     let age = i;
    //     let address = '123 ho chi minh';
    //     let diseaseId = 'e1t24{ig2sgr8160';
    //     let patient = {
    //         name, age, address, diseaseId
    //     }
    //     const disease = await Diseases.findById(patient.diseaseId);
    //     patient.priority = disease.priority;
    //     patient.disease = disease.name;


    //     await Lobby.push(patient);
    // }
};

function upperBound(arr, data) {
    let lo = 0,
        hi = arr.length - 1,
        mid;
    while (lo < hi) {
        mid = (lo + hi) >>> 1;
        if (arr[mid].priority <= data.priority) lo = mid + 1;
        else hi = mid;
    }
    if (arr[lo].priority <= data.priority) return -1;
    return lo;
}
