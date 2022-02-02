import { Application } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

export class socket {
    public server: http.Server;
    public io: Server;

    constructor(app: Application ){

        dotenv.config({ path: `${process.cwd()}/secret.env`});

        let port = <string>process.env.PORT;

        this.server = http.createServer(app);
        this.server.listen(port, this.onListen(port));
        this.io = new Server(this.server);

        this.init();
    }

    private init() : void {
        this.io.on('connection', this.onConnection.bind(this));
    }

    private onConnection(socket: any) : void {
        console.log(`An user connected with id ${socket.id}`);

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        socket.on('chat message', this.onChatMessageReceived.bind(this));
        socket.on('join room', (room: string, callBack: any) => { 
            socket.join(room) 

            callBack(`Joined room ${room}...`);
        });
    }

    private onChatMessageReceived(msg: string): void {
        let json = JSON.parse(msg);

        if (json.room && json.room != null && json.room != ''){
            this.io.to(json.room).emit('chat message', msg);
        }

        console.log(`message: ${msg}`);
    }

    private onListen(port: string): any {
        console.log(`listening on *:${port}`);
    }
}