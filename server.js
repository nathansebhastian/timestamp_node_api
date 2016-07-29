var express = require("express");
var path = require("path");
var moment = require("moment");
var app = express();

app.get('/:query', function (req, res) {
  var result = {unix: null, natural: null};
  console.log(req.params.query);
  
  var time = moment(req.params.query,
    [
      'MM DD YYYY',
      'MMM DD YYYY',
      'MMMM D YYYY',
      'MM DD YY',
      'MMM DD YY',
      'MMMM DD YY',
      'X',
      'x',
    ], true);
  var valid = time.isValid();
  console.log(valid);
  
  if (!valid){
    res.end(JSON.stringify(result));
  }
  else{
    result.unix = moment(time).format("X"); 
  	result.natural = moment(time).format("MMMM Do, YYYY");
    
    res.writeHead(200, { 'Content-Type': 'application/json'});
  	res.end(JSON.stringify(result));  
  }
  
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen(process.env.PORT || 8080 || 5000);