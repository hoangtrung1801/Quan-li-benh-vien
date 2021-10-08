const fs = require("fs");
const generateId = require("../helper/generateId");
const changeDataInObjects = require("../helper/changeDataInObjects");

const { readFileSync, writeFileSync } = fs;

class Document {
    constructor(source) {
        this.source = source;
        this.documentData;

        if (fs.existsSync(this.source)) {
            try {
                const dataFile = JSON.parse(
                    readFileSync(this.source, { encoding: "utf8" })
                );
                this.documentData = dataFile;
            } catch {
                this.documentData = [];
                writeFileSync(this.source, "[]");
            }
        } else {
            this.documentData = [];
            writeFileSync(this.source, "[]");
        }
    }

    readToFile() {
        this.documentData = JSON.parse(
            readFileSync(this.source, { encoding: "utf8" })
        );
    }

    writeToFile(data) {
        writeFileSync(this.source, JSON.stringify(this.documentData));
    }

    get allData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.readToFile();
                resolve(this.documentData);
            }, 100);
        });
    }

    create(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (typeof data === "object" && !Array.isArray(data)) {
                    if (!data.id) {
                        data.id = generateId();
                    }
                    this.readToFile();
                    this.documentData.push(data);
                    this.writeToFile();

                    return resolve(this.documentData);
                }

                return reject("Datat must be an object");
            }, 500);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.readToFile();
                const doc = this.documentData.filter((el) => el.id === id);

                if (!doc[0]) {
                    return reject("This data does not exist");
                }

                return resolve(doc[0]);
            }, 500);
        });
    }

    update(docId, newData) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    if (
                        typeof newData === "object" &&
                        !Array.isArray(newData)
                    ) {
                        this.readToFile();
                        let oldData = this.documentData.find(
                            (dataEl) => dataEl.id === docId
                        );
                        changeDataInObjects(newData, oldData);

                        this.writeToFile();
                        return resolve(oldData);
                    }

                    return reject("New data must be an object");
                } catch (err) {
                    reject(err);
                }
            }, 500);
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const doc = await this.findById(id);
                    const idx = this.documentData.indexOf(doc);

                    this.documentData.splice(idx, 1);
                    this.writeToFile();
                    resolve(this.documentData);
                } catch (err) {
                    reject(err);
                }
            }, 500);
        });
    }
}

module.exports = Document;
