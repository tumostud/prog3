var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var fs = require('fs');

// Define the port to run on
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('The server started on port ' + port);
});

io.on('connection', function(socket) {
  // Get the statistics object, stringify and send them to a json file, inform the client side that a statistics file has been created
  
});