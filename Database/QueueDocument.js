const generateId = require("../helper/generateId");
const Document = require("./Document");

/*
    Queue Document:
    + constructor(source, scoreFunction) -> scoreFunction is value comparing function between two object
    + push -> push data into document 
    + pop -> pop data off document and return that data
*/

class QueueDocument extends Document {
    constructor(source, scoreFunction) {
        super(source);
        // value comparing function
        this.scoreFunction = scoreFunction;
    }

    push(data) {
        return new Promise(async (resolve, reject) => {
            if (typeof data === "object" && !Array.isArray(data)) {
                if (!data.id) {
                    data.id = generateId();
                }
                await this.readToFile();

                this.documentData.push(data);
                this.bubbleUp(this.documentData.length - 1);

                await this.writeToFile();
                return resolve(this.documentData);
            }

            return reject("Data must be an object");
        })

    }

    pop() {
        return new Promise(async (resolve, reject) => {
            await this.readToFile();
            if (this.documentData.length == 0) return reject("Have no data in document");

            let result = this.documentData[0];
            let end = this.documentData.pop();

            if (this.documentData.length > 0) {
                this.documentData[0] = end;
                this.sinkDown(0);
            }

            await this.writeToFile();
            return resolve(result);
        })
    }

    bubbleUp(n) {
        let data = this.documentData[n],
            score = this.scoreFunction(data);

        while (n > 0) {
            let parentN = Math.floor((n + 1) / 2) - 1,
                parent = this.documentData[parentN];

            if (score >= this.scoreFunction(parent)) break;

            this.documentData[parentN] = data;
            this.documentData[n] = parent;
            n = parentN;
        }
    }

    sinkDown(n) {
        let length = this.documentData.length,
            data = this.documentData[n],
            dataScore = this.scoreFunction(data);

        while (true) {
            let child2N = (n + 1) * 2,
                child1N = child2N - 1,
                swap = null;

            if (child1N < length) {
                var child1 = this.documentData[child1N],
                    child1Score = this.scoreFunction(child1);

                if (child1Score < dataScore)
                    swap = child1N;
            }

            if (child2N < length) {
                var child2 = this.documentData[child2N],
                    child2Score = this.scoreFunction(child2);

                if (child2Score < (swap == null ? dataScore : child1Score))
                    swap = child2N;
            }

            if (swap == null) break;

            this.documentData[n] = this.documentData[swap];
            this.documentData[swap] = data;
            n = swap;
        }
    }
}

module.exports = QueueDocument;
