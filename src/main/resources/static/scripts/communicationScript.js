var communication = (function(){
    var stompClient = null,

    connect=function () {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/messages', function(serverMessage){
                showServerMessage(JSON.parse(serverMessage.body).content);
            });
        });
        alert("aqui estoy");

    },

    disconect=function () {
        if (stompClient != null) {
        stompClient.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    },

    sendMessage=function() {
        var index=drawingApp.clickX.length-1;
        var message=drawingApp.clickX[index]+","+drawingApp.clickY[index]+","+drawingApp.clickColor[index]+","+drawingApp.clickTool[index]+","+drawingApp.clickSize[index]+","+drawingApp.clickDrag[index];
        stompClient.send("/app/message", {}, JSON.stringify({ 'message': message}));
    },

    showServerMessage=function(message) {
        var mArray=message.split(",");
        guesserApp.addPoint(mArray[0],mArray[1],mArray[2],mArray[3],mArray[4],mArray[5]);
    },

    initM=function() {
       connect();
    };
    
    return {
      initM:initM  
    };
}());


//window.onload=communication.initM();