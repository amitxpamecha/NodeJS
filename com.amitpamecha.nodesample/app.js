/**
 * Module dependencies.
 */
var express = require('express'), 
favicon = require('serve-favicon'), 
morgan = require('morgan'), 
bodyParser = require('body-parser'), 
methodOverride = require('method-override'), 
errorhandler = require('errorhandler'), 
http = require('http'), 
path = require('path');

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/garagedb');
require('./models/model.js');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.jpg'));
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({
	extended : false
}))

// parse application/json 
app.use(bodyParser.json())
// override with the X-HTTP-Method-Override header in the request 
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(errorhandler({
		log : errorNotification
	}));
}

function errorNotification(err, str, req) {
	var title = 'Error in ' + req.method + ' ' + req.url

	notifier.notify({
		title : title,
		message : str
	})
}

var routes = require('./routes/routes.js');
routes.route(app);

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

var WebSocketServer = require('ws').Server;
var wsServer        = new WebSocketServer({ server : server });
wsServer.on('connection', function(socket) {
	  console.log("A connection established");
	  socket.send('XYZ');
	  socket.on('message', function(message) {
	        console.log('received: %s', message);
	    });
	});
