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
                this.readToFile();
            } catch {
                this.documentData = [];
                this.writeToFile();
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
        return new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(this.source, {encoding: 'utf8'});

            writeStream.write(JSON.stringify(this.documentData, null, 2));
            writeStream.end();
            writeStream.on('finish', () => {
                resolve();
            })
        })
    }

    get allData() {
        return new Promise(async (resolve) => {
            await this.readToFile();
            resolve(this.documentData);
        });
    }

    create(data) {
        return new Promise(async (resolve, reject) => {
            if (typeof data === "object" && !Array.isArray(data)) {
                if (!data.id) {
                    data.id = generateId();
                }
                await this.readToFile();
                this.documentData.push(data);
                await this.writeToFile();

                return resolve(this.documentData);
            }

            return reject("Data must be an object");
        });
    }

    findById(id) {
        return new Promise(async (resolve, reject) => {
            await this.readToFile();
            const doc = this.documentData.filter((el) => el.id === id);

            if (!doc[0]) {
                return reject("This data does not exist");
            }

            return resolve(doc[0]);
        });
    }

    update(docId, newData) {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    typeof newData === "object" &&
                    !Array.isArray(newData)
                ) {
                    await this.readToFile();
                    let oldData = this.documentData.find(
                        (dataEl) => dataEl.id === docId
                    );
                    changeDataInObjects(newData, oldData);

                    await this.writeToFile();
                    return resolve(oldData);
                }

                return reject("New data must be an object");
            } catch (err) {
                reject(err);
            }
        });
    }

    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const doc = await this.findById(id);
                const idx = this.documentData.indexOf(doc);

                this.documentData.splice(idx, 1);

                await this.writeToFile();
                resolve(this.documentData);
            } catch (err) {
                reject(err);
            }
        });
    }

    pop_front() {
        return new Promise(async (resolve, reject) => {
            await this.readToFile();

            const data = this.documentData.shift();

            await this.writeToFile();

            if (data) return resolve(data);
            else return reject("Have no data in this document");
        });
    }

    pop_back() {
        return new Promise(async (resolve, reject) => {
            await this.readToFile();

            const data = this.documentData.pop();

            await this.writeToFile();

            if (data) return resolve(data);
            else return reject("Have no data in this document");
        });
    }

    isEmpty() {
        return new Promise(async (resolve) => {
            await this.readToFile();
            if (this.documentData.length > 0) return resolve(false);
            return resolve(true);
        })
    }
}

module.exports = Document;
