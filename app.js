var createError = require('http-errors');
var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

const dbInit = async (db) => {
  await mongoose.connect(db);
}

dbInit(config.db)

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const newsRouter = require('./routes/news');
const quizRouter = require('./routes/quiz');
const apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use in that case its handlig middlewares
app.use(logger('dev'));
app.use(express.json());//parsing json to object
app.use(express.urlencoded({ extended: false }));//automatic parsing html forms
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//static declaration
app.use(
  cookieSession({
    name: "session",
    keys: config.keySession,

    //Cookie Options
    maxAge: config.maxAgeSession
  })
);

app.use(function (req, res, next) {
  res.locals.path = req.path;//thanks this pass req path to res.locals.path, we have global acces 
  next();//run next middleware
})

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
