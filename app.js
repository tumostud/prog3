// File Reading and Writing
var fs = require('fs'); 
// Server
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// Array of Statistics Object
var statArr = [];

// If There is data.json
if (fs.existsSync("public/data.json")) {
    // Read from the File and Immediately Convert to an Object 
    var statArr = require("./public/data.json");
}

// Declaring the Directory of Static Files
app.use(express.static("public"));
// Declaring the Client's Needed JavaScript Directories
app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/p5', express.static(__dirname + '/node_modules/p5/lib/'));

// Root Route
app.get('/', function (req, res) {
    res.redirect('index.html');
});
// Stats Route
app.get('/stats', function (req, res) {
    res.redirect('stats.html');
});

// Listen to This Port
server.listen(3000);

// Server-Side Magic
io.on('connection', function (socket) {
    socket.on("send data", function (data) { // When the Client Sends "send data"
        // statArr = []; // If only one stat object should be kept in the statistics array
        statArr.push(data); // Adding New Info to the Array
        fs.writeFile('public/data.json', JSON.stringify(statArr, null, 4)); // Writing the Info of the Statistics in the File
    })

    socket.on("get stats", function () { // When the Client Sends "get stats" 
        // Read the Statistics File
        fs.readFile('public/data.json', "utf8", function(err, statisticsFromFile) {
            // And Send it as "send stats"
            socket.emit("send stats", statisticsFromFile);    
        });  
    })
});