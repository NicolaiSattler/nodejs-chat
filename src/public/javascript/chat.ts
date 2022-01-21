import { io, Socket } from "socket.io-client";

export class Chat {
    public messages: HTMLElement | null;
    public form: HTMLFormElement | null;
    public messageInput: HTMLInputElement | null;
    public userInput: HTMLInputElement | null;
    public roomInput: HTMLInputElement | null;
    public joinButton: HTMLButtonElement | null;
    public socket: Socket;

    constructor() {
        this.messages = document.getElementById('messages');
        this.form = document.getElementById('form') as HTMLFormElement;
        this.messageInput = document.getElementById('message') as HTMLInputElement;
        this.userInput = document.getElementById('user') as HTMLInputElement;
        this.roomInput = document.getElementById('room') as HTMLInputElement;
        this.joinButton = document.getElementById('join-room') as HTMLButtonElement;
        this.socket = io();

        this.init();
    }

    init(): void {
        if (this.form != null) {
            this.form.addEventListener('submit', this.onFormSubmit.bind(this));
        }

        if (this.joinButton != null) {
            this.joinButton.addEventListener('click', this.joinRoomClicked.bind(this));
        }

        this.socket.on('connect', this.onConnect.bind(this));
        this.socket.on('chat message', this.onChatMessageReceived.bind(this));
    }

    addMessage(content: string): void {
        const y = document.body.scrollHeight;
        const li = document.createElement('li');
        li.setAttribute('class', 'list-group-item')
        li.textContent = content;

        if (this.messages != null) {
            this.messages.appendChild(li);
        }

        window.scrollTo(0, y);
    }

    joinRoomClicked(){
        if (this.roomInput != null){
            this.socket.emit('join room', this.roomInput.value, this.addMessage.bind(this));
        }
    }

    onFormSubmit(e: any) {

        e.preventDefault();

        if (this.messageInput?.value != null){
            const messageContent = {
                user: this.userInput?.value,
                message: this.messageInput?.value,
                room: this.roomInput?.value
            };
            const json = JSON.stringify(messageContent);
            this.socket.emit('chat message', json);
            this.messageInput.value = '';
        }
    }

    onConnect() : void {
        const content = `Connected with id ${this.socket.id}`;
        this.addMessage(content);

        if (this.roomInput != null) {
            this.roomInput.value = this.socket.id;
        }
    }

    onChatMessageReceived(message: string) : void {
        const msg = JSON.parse(message);
        const content = `${msg.user}: ${msg.message}`;

        this.addMessage(content);
    }
}
