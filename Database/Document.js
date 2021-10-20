const fs = require("fs");
const generateId = require("../helper/generateId");
const changeDataInObjects = require("../helper/changeDataInObjects");

const {readFileSync, writeFileSync} = fs;

/*
    Documentation :
    + constructor(source) -> source : file .json store data of document
    + allData -> return all data in document 
    + create(data) -> push data in document 
    + findById(id) -> find data by id
    + update(id, data) -> update new data
    + delete(id) -> delete data out of document
    + pop_front() -> delete data on the top and that data
    + pop_back() -> delete data on the last and return that data

    id: auto generate 
*/

class Document {
    constructor(source) {
        this.source = source;
        this.documentData;

        if (fs.existsSync(this.source)) {
            try {
                const dataFile = JSON.parse(
                    readFileSync(this.source, {encoding: "utf8"})
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
        return new Promise((resolve, reject) => {
            let data = "";
            const readerStream = fs.createReadStream(this.source, {encoding: 'utf8'});

            readerStream.on('data', (chunk) => {
                data += chunk;
            }).on('end', () => {
                this.documentData = JSON.parse(data);
                resolve();
            })
        })
    }

    writeToFile(data) {
        writeFileSync(this.source, JSON.stringify(this.documentData, null, 2));
        // return new Promise((resolve, reject) => {
        //     const writeStream = fs.createWriteStream(this.source, {encoding: 'utf8'});
        //     console.log(this.documentData);
        //     console.log(typeof this.documentData);
        //     // writeStream.write(JSON.stringify(this.documentData, null, 2));
        //     // writeStream.end(() => resolve());
        // })
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

                return reject("Data must be an object");
            }, 100);
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
            }, 100);
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
            }, 100);
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
            }, 100);
        });
    }

    pop_front() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.readToFile();

                const data = this.documentData.shift();

                this.writeToFile();

                if (data) return resolve(data);
                else return reject("Have no data in this document");
            }, 100);
        });
    }

    pop_back() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.readToFile();

                const data = this.documentData.pop();

                this.writeToFile();

                if (data) return resolve(data);
                else return reject("Have no data in this document");
            }, 100);
        });
    }

    isEmpty() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.readToFile();
                if (this.documentData) return resolve(true);
                return resolve(false);
            }, 100)
        })
    }
}

module.exports = Document;
