// IO Socket
var socket = io.connect('http://localhost:3000');
// Stat List HTML Elements
var statListHTML = "";
// The div in Which All the Stat Elements Will Be Filled
var allStats = document.getElementById("all-stats");
// Numbered Stats Counter
var statNumCount = 0;

// Every 10000 milliseconds
setInterval(function(){
    // Send "get stats" request to the server
    socket.emit("get stats", []);
}, 10000);

// When the server sends data with "send stats"
socket.on("send stats", function(statistics){
    statNumCount++;
    // Preparing the Stats List
    statistics = JSON.parse(statistics);
    statListHTML += "<p class='stat-count-text'>Stats " + statNumCount + ":</p>";
    for (var stat of statistics) {
        statListHTML += "<ul id='stat-list'>";
        for (var st in stat) {
            if (stat.hasOwnProperty(st)) {
                statListHTML += "<li>";
                statListHTML += st + ": " + stat[st];
                statListHTML += "</li>";
            }
        }
        statListHTML += "</ul>";
    }
    allStats.innerHTML = statListHTML;
})