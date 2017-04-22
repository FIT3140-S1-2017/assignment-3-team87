var express = require('express')
var app = express()
var path = require('path')
var bone = require('bonescript')

//listen to port
var server = app.listen(3001, function () { console.log('Listening on port 3001!') }) 


var admin = require("firebase-admin");
var serviceAccount = require("./spike2-7c8a9-firebase-adminsdk-vkgg1-c931031657.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://spike2-7c8a9.firebaseio.com"
});

//global variables for firebase database reference
var db = admin.database();
var ref = db.ref();

app.use(express.static(path.join(__dirname, '../public')))
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'))
})

//motion sensor
var sensor = "P8_19"
bone.pinMode(sensor, bone.INPUT);

var start;
var end;

setInterval(startSensor, 2500);

function startSensor(){
  bone.digitalRead(sensor, updateDB);
}

function updateDB(x){
  if(x.value === 0){
    //do this when status is LOW
    end = new Date();
    console.log("motionend " + end.toTimeString());
    ref.set({
      "high" : "off",
      "low" : "on",
      "timestamp" : end.getTime()
    });
  }
  else{
    //do this if HIGH
    start = new Date();
    console.log("motionstart " + start.toTimeString());
    ref.set({
      "high" : "on",
      "low" : "off",
      "timestamp" : start.getTime()
    });
  }
}