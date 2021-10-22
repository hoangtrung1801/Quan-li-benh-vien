
module.exports = (req, res, next) => {
    let warning;

    if (!req.body.name) warning = "Required name";
    else if (!req.body.age) warning = "Required age";
    else if (!req.body.address) warning = "Required address";
    else if (!req.body.diseaseId) warning = "Required disease";

    if (warning) {
        res.locals.warning = warning;
    } else {
        req.body.date = new Date().getTime();
    }

    next();
}
