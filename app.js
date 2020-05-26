var createError = require("http-errors");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const pe = require("parse-error");
const fileupload = require("express-fileupload");
var mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorResponse = require("./utils/errorResponse");
var zip = require('express-easy-zip');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// db
// require("dotenv").config();
require("./config/db");

var app = express();

app.use(bodyParser.json());

//include zip
app.use(zip());

// Set static folder
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'))

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
// To remove data, use:
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS(cross site scripting) attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileupload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  //get custome errors
  let error = {
    ...err
  };
  error.message = err.message;

  // mongoose bad object id
  if (err.name === "CastError") {
    const message = `Resources not found`;
    error = new errorResponse(message || 404);
  }

  //mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value`;
    error = new errorResponse(message || 404);
  }

  //mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new errorResponse(message || 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error"
  });
  // res.render('error');
});

//This is here to handle all the uncaught promise rejections
process.on("unhandledRejection", error => {
  console.error("Uncaught Error", pe(error));
});

module.exports = app;
