
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

    function sendMessage (message) {        
        stompClient.send("/app/message", {}, JSON.stringify({ 'message': message}));
    };

    function showServerMessage(message) {
        var mArray=message.split(",");
        console.log(mArray[5]==="true"||mArray[5]==="false");
        if (message==="1" || message==="0"){
            changeDrawer(message);
        }else if (mArray[5]==="true"||mArray[5]==="false"){
            addPoint(mArray[0],mArray[1],mArray[2],mArray[3],mArray[4],mArray[5]);
        }else if (message==="deleteall"){
            canvasClr();
        }else if(mArray[0]==="WIN"){
            finishGame(mArray[1]);
        }else{
            compareWords(message);
        }        
    };

    function initM() {
       connect();
    };