const Reception = require("../models/Reception/Reception");

const maxSlotInReception = 10;

module.exports = async (req, res, next) => {
    const slotCurrentInReception = (await Reception.allData).length;
    if (slotCurrentInReception >= maxSlotInReception) {
        res.locals.receptionIsFull = true;
    }

    next();
};
