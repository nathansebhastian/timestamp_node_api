var express = require("express");
var path = require("path");
var moment = require("moment");
var app = express();
var result = {unix: null, natural: null};

app.get('/:query', function (req, res) {
  var query = new Date(req.params.query);
  
  if(Object.prototype.toString.call(query) === "[object Date]"){
    if (!isNaN(query.getTime())) {
			result.unix = moment(query).format("X"); 
			result.natural = moment(query).format("MMMM Do, YYYY");
		// 	result.natural = months[query.getMonth()] + ' ' + query.getDate() + ', ' + query.getFullYear();
		}
  }
  
  res.writeHead(200, { 'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen(process.env.PORT || 8080 || 5000);