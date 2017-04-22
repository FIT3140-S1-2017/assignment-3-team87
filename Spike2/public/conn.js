$(function () {
    var responseTime;
    var motionRef = firebase.database().ref()

    motionRef.child('high').on('value', function(snapshot) {
        document.getElementById('high_read').innerText = snapshot.val();
    });

    motionRef.child('low').on('value', function(snapshot) {
        document.getElementById('low_read').innerText = snapshot.val();
    });

    motionRef.child('timestamp').on('value', function(snapshot) {
        var currentTime = new Date();
        responseTime = currentTime.getTime() - snapshot.val();
        document.getElementById('resp_time').innerText = responseTime;
    });

});

