var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//-------------- Begin COVE -------------//
// var coveapi = require('cove-api');
// //var api_id = 'KLRU-33074411-4d78-4875-a9dc-ff1ae3e12a24';
// //var api_secret = 'b3c4f332-8244-4498-b9f1-8bbab085a1dc';
//
// var cove_api_id =  process.env.COVE_API_ID || null;
// var cove_api_secret = process.env.COVE_API_SECRET || null;
//
// var cid = {
//   api_id : cove_api_id,
//   api_secret : cove_api_secret
//   //log_level : 'off'
//   };

//-------------- End Cove --------------//

var routes = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
var localProductions = require('./routes/local-productions');

var app = express();

//--------------------Begin WordPress --------------------------------//
/*var WP = require('wordpress-rest-api');
//var site = new WP({endpoint:'http://www.klru.org/wp-json'});

//Requesting Posts
//var klru_posts = "";
/site.posts().get(function(err, data){
    if (err){
	//handle err
	console.log('could not find the requested posts');
    }
    //do something with data
    klru_posts = data;
});

console.log(klru_posts);
*/
//-------------------End WordPress -----------------------------//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/about', about);
app.use('/local-productions', localProductions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
