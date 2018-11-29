var fs = require('fs');  // File reading and writing
var express = require('express'); // Server
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var statArr = []; // Array of statistics object

// If there is data.json
if (fs.existsSync("public/data.json")) {
    // Read from the file and immediately convert to an object 
    var statArr = require("./public/data.json");
}

// Declaring the directory of static files
app.use(express.static("public"));
// Declaring the client's needed javascript directories, check in index.html of the stats project
app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/p5', express.static(__dirname + '/node_modules/p5/lib/'));

// Root route
app.get('/', function (req, res) {
    res.redirect('index.html');
});
// Stats route
app.get('/stats', function (req, res) {
    res.redirect('stats.html');
});

// Listen to this port
server.listen(3000);

// Server-side magic
io.on('connection', function (socket) {
    socket.on("send data", function (data) {
        statArr.push(data); // Adding new info to the array
        fs.writeFile('public/data.json', JSON.stringify(statArr, null, 4)); // Writing the info of the statistics in the file
    })

    socket.on("get stats", function () { // When the client sends "get stats" 
        // Read the statistics file
        fs.readFile('public/data.json', "utf8", function(err, statisticsFromFile) {
            // And send it as "send stats"
            socket.emit("send stats",statisticsFromFile);    
        });  
    })
});
