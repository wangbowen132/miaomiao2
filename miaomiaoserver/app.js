var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var redis = require('redis');
var RedisStore = require('connect-redis')(session);



var { Mongoose } = require('./untils/config')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const redisClient = redis.createClient(6379, '127.0.0.1');
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: '@#$#',
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*60
  }
}))

app.use('/', indexRouter);
app.use('/api2/users', usersRouter);
app.use('/api2/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

Mongoose.connect();

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
