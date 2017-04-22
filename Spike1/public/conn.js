$(function () {
    var socket = io();
    var responseTime;

    // receiving from server
    socket.on('start', function (pdata, data) {
        $('#start_time').html(pdata);
        console.log("can start be seen?");
        var currentTime = new Date();
        responseTime = currentTime.getTime() - data;
        $('#resp_time').html(responseTime);
    })

    socket.on('end', function (pdata, data) {
        $('#end_time').html(pdata);
        console.log("can end be seen?");
        var currentTime = new Date();
        responseTime = currentTime.getTime() - data;
        $('#resp_time').html(responseTime);
    })
});

