const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const lobbyRouter = require("./routes/lobby.route");
const receptionRouter = require("./routes/reception.route");
const doctorRoomRouter = require("./routes/doctor-room.route");
const adminRouter = require("./routes/admin.route");
const apiRouter = require('./api/index');

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// route
app.use("/", indexRouter);
app.use("/lobby", lobbyRouter);
app.use("/reception", receptionRouter);
app.use("/doctor-room", doctorRoomRouter);

app.use("/api", apiRouter);

// admin for management
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(createError(404))
});

// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;