var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(express.static('public'));
app.use(session({ secret: 'shhhhhhh', resave: false, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // Log all requests to the console.

require('./routes/index.js')(app);

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Hangman2999 is listening on port ' + port + '. Good luck and may the odds be ever in your favor.');
});
