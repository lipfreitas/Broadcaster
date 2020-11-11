var broadcaster = {
    address: null,
    socketInstance : null,
    initialize: function (){
        if(!broadcaster.address) return false;
        broadcaster.socketInstance = io.connect(broadcaster.address);
    },
    listen: function(channel, callback){
        if(!broadcaster.socketInstance) return false;
        broadcaster.socketInstance.on(channel, function (message){
            callback(message);
        });
    },
    emit: function (channel, message){
        return broadcaster.socketInstance.emit(channel, message);
    }
}