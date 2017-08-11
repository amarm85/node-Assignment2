const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser')
mongoose = require('mongoose'),
config = require('./config');

var dishRouter = require('./routes/dishRouter');

//create express app
var app = express();

//set host name and port
app.set('hostName',process.env.hostname||'localhost');
app.set('port',process.env.port||4000);


app.use(morgan(process.env.logger||'dev'));
app.use(bodyParser.json());

//connect to Mongo Database
mongoose.connect(config.url);
var db = mongoose.connection;

db.on('error',console.error.bind(console,"connection error to Mongo DB"));

// once DB is connected then load the routes and start the server.
db.once('open',function(){

	app.use('/dishes',dishRouter);

	// error middleware 
	app.use(function(err,req,res,next){
		res.status(err.status||500);
		res.end(JSON.stringify(err));	
		console.log(err);
	});

	app.listen(app.get('port'),app.get('hostName'),function(){

		console.log(`API server is running at http://${app.get('hostName')}:${app.get('port')}`);

	});

});





