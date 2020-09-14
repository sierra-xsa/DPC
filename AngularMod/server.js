"use strict";

//var https = require("https");
//var xsenv = require("@sap/xsenv");
var port = process.env.PORT || 3000;
var server = require("http").createServer();
//https.globalAgent.options.ca = xsenv.loadCertificates();
global.__base = __dirname + "/";

var express = require("express");
var app = express();

app.disable('x-powered-by');

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.send(200);
});

// Point static path to dist
app.use(express.static(global.__base + 'dist'));

// Catch all other routes and return the index file
app.all('*', (req, res) => {
  res.sendFile(global.__base + 'dist/index.html');
});

//Start the Server 
server.on("request", app);
server.listen(port, function() {
	console.info(`HTTP Server: ${server.address().port}`);
});