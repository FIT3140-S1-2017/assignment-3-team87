var five = require("johnny-five");
var BeagleBone = require("beaglebone-io");
var board = new five.Board({
  io: new BeagleBone()
});

var express = require('express')
var app = express()
var path = require('path')

//listen to port
var server = app.listen(3001, function () { console.log('Listening on port 3001!') }) 
var socket = require('socket.io')(server)

app.use(express.static(path.join(__dirname, '../public')))
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'))
})

var start;
var end;

board.on("ready", function() {

  // Create a new `motion` hardware instance.
  var motion = new five.Motion("P8_19");

  // "calibrated" occurs once, at the beginning of a session
  motion.on("calibrated", function() {
    console.log("calibrated");
  });

  // "motionstart" events are fired when motion occurs within 
  // the observable range of the motion sensor
  motion.on("motionstart", function() {
    start = new Date();
    console.log("motionstart" + start.toTimeString());
    socket.emit("start", start.toTimeString(), start.getTime());
  });

  // "motionend" events are fired when motion has ceased
  motion.on("motionend", function() {
    end = new Date();
    console.log("motionend" + end.toTimeString());
    socket.emit("end", end.toTimeString(), end.getTime());
  });
});