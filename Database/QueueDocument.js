const generateId = require("../helper/generateId");
const Document = require("./Document");

/*
    Documentation:
    + allData -> return data document
    + create (push) -> push data into document 
    + pop -> pop data off document and return that data

    new QueueDocument(souce, async (a, b) => (await Disease.findById(a.diseaseId)).priority <= (await Disease.findById(b.diseaseId)).priority)
*/

class QueueDocument extends Document {
    constructor(source, compare = (a, b) => a > b) {
        super(source);
        this.compare = compare;
    }

    isEmpty() {
        this.readToFile();
        return !this.documentData.length;
    }

    push(data) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (typeof data === "object" && !Array.isArray(data)) {
                    if (!data.id) {
                        data.id = generateId();
                    }
                    this.readToFile();

                    if (this.isEmpty()) {
                        this.documentData.push(data);
                    } else {
                        const i = upperBound(this.documentData, data);

                        if (i === -1) this.documentData.push(data);
                        else this.documentData.splice(i, 0, data);
                    }

                    this.writeToFile();
                    return resolve(this.documentData);
                }
                return reject("Data must be object");
            }, 100);
        });
    }

    pop() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.readToFile();
                const data = this.documentData.shift();
                this.writeToFile();
                resolve(data);
            }, 100);
        });
    }
}

module.exports = QueueDocument;

function upperBound(arr, data) {
    let lo = 0,
        hi = arr.length - 1,
        mid;
    while (lo < hi) {
        mid = (lo + hi) >>> 1;

        if (parseInt(arr[mid].priority) <= parseInt(data.priority))
            lo = mid + 1;
        else hi = mid;
    }

    if (parseInt(arr[lo].priority) <= parseInt(data.priority)) return -1;
    return lo;
}
