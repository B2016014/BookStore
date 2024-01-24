var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var booksRouter = require('./routes/bookRouter');
var favoriteRouter=require('./routes/favoriteRouter');
var cartRouter=require('./routes/cartRouter');
var uploadRouter=require('./routes/uploadRouter');
var stripeRouter=require('./routes/stripe');

//mongodb connection
var config=require('./config');
const mongoose =require('mongoose');
const url=config.mongoURL;
const connect=mongoose.connect(url);
connect.then((db)=>{
  console.log("connected correctly to the database");
},(err)=>{console.log(err);});

var app = express();

//setting cors
const cors=require('cors');
app.use(cors({
  origin:'http://localhost:3001',
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Books',booksRouter);
app.use('/users',usersRouter);
app.use('/favorites',favoriteRouter);
app.use('/cart',cartRouter);
app.use('/upload',uploadRouter);
app.use('/stripe',stripeRouter);


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
