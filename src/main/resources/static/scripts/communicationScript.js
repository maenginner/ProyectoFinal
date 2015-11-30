
    var stompClient = null;
    
    function connect () {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/messages', function(serverMessage){
                showServerMessage(JSON.parse(serverMessage.body).content);
            });
        });
    };

    function disconnect() {
        if (stompClient != null) {
        stompClient.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    };

    function sendMessage () {
        var index=clickX.length-1;
        var message=clickX[index]+","+clickY[index]+","+clickColor[index]+","+clickTool[index]+","+clickSize[index]+","+clickDrag[index];
        stompClient.send("/app/message", {}, JSON.stringify({ 'message': message}));
    };

    function showServerMessage(message) {
        var mArray=message.split(",");
        addPoint(mArray[0],mArray[1],mArray[2],mArray[3],mArray[4],mArray[5]);
    };

    function initM() {
       connect();
    };
    


//window.onload=communication.initM();