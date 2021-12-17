const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

class socket {
    constructor(app){
        dotenv.config({ path: './secret.env' });

        let port = process.env.PORT;

        this.server = http.createServer(app);
        this.server.listen(port, this.onListen(port));

        this.io = new Server(this.server);
        this.io.on('connection', this.onConnection.bind(this));
    }

    onConnection(socket) {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        socket.on('chat message', (msg) => {
            this.io.emit('chat message', msg);
            console.log(`message: ${msg}`);
        });
    }

    onListen(port) {
        console.log(`listening on *:${port}`);
    }
}

module.exports = socket;


