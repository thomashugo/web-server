var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
  requireAuthentication: function(req, res, next) {
    console.log('private route hit!');
    next();
  },
  logger: function(req, res, next) {
    var date = new Date().toString()
    console.log("Request: " + date + " - " + req.method + " " + req.originalUrl);
    next();
  },
};

app.use(middleware.logger);

// app.use(middleware.requireAuthentication);

app.get('/about', middleware.requireAuthentication, function(req, res){
  res.send('<h1>About Us</h1>');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
  console.log('Express server started on port ' + PORT + '!');
});
