a
var http = require('http');
var path = require('path');
var express = require('express');
var fs = require("fs");
var app  = express();
var server = http.createServer(app);

//listPlayers
app.get('/playerinfo', function (req, res) {
   fs.readFile( __dirname + "/" + "players.json", 'utf8', function (err, data) {
       res.end( data );
       console.log("Listed Player.");
   });
})

//addPlayer
app.post('/playerinfo', function (req, res) {
   fs.readFile( __dirname + "/" + "players.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var a = req.query.key;
       var b = req.query.value;
       data[a] = b;
       fs.writeFile(__dirname + "/" + "players.json", JSON.stringify(data), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("Added Player.");
});
      res.end( JSON.stringify(data));
   });
   
})

//updatePlayer
app.put('/playerinfo', function (req, res) {
      var file = require("./players.json");
      var a = req.query.key;
      var b = req.query.value;
      file[a]=b;
      fs.writeFile(__dirname + "/" + "players.json", JSON.stringify(file), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
       console.log("Updated Player.");
       fs.readFile( __dirname + "/" + "players.json", 'utf8', function (err, data) {
       res.end( data );
   });
       
});
})

//deletePlayer
app.delete('/playerinfo', function (req, res) {
   fs.readFile( __dirname + "/" + "players.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var a = req.query.id;
       delete data[a];
       
      fs.writeFile(__dirname + "/" + "players.json", JSON.stringify(data), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
       console.log("Deleted Player.");
});
       res.end( JSON.stringify(data));
   });
})


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
