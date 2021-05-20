var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload')
const firebaseAdmin = require('firebase-admin');

var serviceAccount = require("./off-home-93451-firebase-adminsdk-ew1oq-42cac07c20.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://off-home-93451-default-rtdb.firebaseio.com/'
});


var indexRouter = require('./src/api/index');
var usersRouter = require('./src/api/users');
var activitatsRouter = require('./src/api/activitats');
var categoriesRouter = require('./src/api/categories');
var tagsRouter = require('./src/api/tags');
var UploadsRouter = require('./src/api/uploads');
var xatsRouter = require('./src/api/xats');
var assolimentsRouter =  require('./src/api/assoliments');


var app = express();

app.use(fileUpload());
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
app.use('/tags',tagsRouter);
app.use('/upload',UploadsRouter);
app.use('/xats',xatsRouter);
app.use('/assoliments',assolimentsRouter);

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
  else if (String(err).includes("SQLITE_CONSTRAINT: NOT NULL constraint failed: Activitats.titol")) {
    res.status(500).send('A title is needed');
  }
  else {
    res.status(500).send(err.message);
  }
});

module.exports = app;
