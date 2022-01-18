const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

class socket {
    constructor(app){

        dotenv.config({ path: `${process.cwd()}/secret.env`});

        let port = process.env.PORT;

        this.server = http.createServer(app);
        this.server.listen(port, this.onListen(port));
        this.io = new Server(this.server);

        this.init();
    }

    init() {
        this.io.on('connection', this.onConnection.bind(this));
    }

    onConnection(socket) {
        console.log(`An user connected with id ${socket.id}`);

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        socket.on('chat message', this.onChatMessageReceived.bind(this));
        socket.on('join room', (room, callBack) => { 
            socket.join(room) 

            callBack(`Joined room ${room}...`);
        });
    }

    onChatMessageReceived(msg){
        let json = JSON.parse(msg);

        if (json.room && json.room != null && json.room != ''){
            this.io.to(json.room).emit('chat message', msg);
        }

        console.log(`message: ${msg}`);
    }

    onListen(port) {
        console.log(`listening on *:${port}`);
    }
}

module.exports = socket;
