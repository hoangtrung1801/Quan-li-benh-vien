// deep copy two object
module.exports = (newData, oldData) => {
    for (let i in oldData) {
        for (let j in newData) {
            if (i === j) oldData[i] = newData[j];
            else oldData[j] = newData[j];
        }
    }
    return oldData;
};
