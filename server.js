// server.js

// DEPENDENCIES
// ===============================================

var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'); // Middleware to read POST data

// SETUP
// ===============================================

// Set the port number.
var   port = Number(process.env.PORT || 8080);

// Set up body-parser.
// To parse JSON:
app.use(bodyParser.json());
// To parse form data:
app.use(bodyParser.urlencoded({
  extended: true
}));

// Tell the app that the view engine is also Handlebars.
app.set('view engine', 'handlebars');

// DATABASE
// ===============================================

// Setup the database.
var Datastore = require('nedb');
var db = new Datastore({
  filename: 'goals.db', // provide a path to the database file
  autoload: true, // automatically load the database
  timestampData: true // automatically add and manage the fields createdAt and updatedAt
});

// Let us check that we can save to the database.
// Define a goal.
var goal = {
  description: 'Do 10 minutes meditation every day',
};

// Save this goal to the database.
db.insert(goal, function(err, newGoal) {
  if (err) console.log(err);
  console.log(newGoal);
});

// ROUTES
// ===============================================

// Define the home page route.
app.get('/', function(req, res) {
  res.send('Our first route is working.:)');
});

// START THE SERVER
// ===============================================

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
