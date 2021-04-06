var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/api/index');
var usersRouter = require('./src/api/users');
var activitatsRouter = require('./src/api/activitats');
var categoriesRouter = require('./src/api/categories');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/activitats',activitatsRouter);
app.use('/categories',categoriesRouter);

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
 // res.status(err.status || 500);
  //res.render('error');
  if (String(err).includes("UNIQUE constraint failed: Usuaris.username")) {
    res.status(500).send('This username is already in use');
  }
  else if(String(err).includes("UNIQUE constraint failed: Usuaris.email")) {
    res.status(500).send('This email is already in use');
  }
  else if (String(err).includes("UNIQUE constraint failed: Activitats.usuariCreador, Activitats.dataHoraIni")) {
    res.status(500).send('The user alreadey has an activity at this date and hour');
  }
  else if (String(err).includes("UNIQUE constraint failed: Participants.usuariCreador, Participants.dataHoraIni, Participants.usuariParticipant")) {
    res.status(500).send('The user is already in the activity');
  }
  else if (String(err).includes("UNIQUE constraint failed: Llocs.nomCarrer, Llocs.numCarrer")) {
    res.status(500).send('The ubication already exists');
  }
  else {
    res.status(500).send(err.message);
  }
});

module.exports = app;
