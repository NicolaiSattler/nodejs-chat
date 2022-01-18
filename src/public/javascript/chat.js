class Chat {
    constructor() {

        this.messages = document.getElementById('messages');
        this.form = document.getElementById('form');
        this.messageInput = document.getElementById('message');
        this.userInput = document.getElementById('user');
        this.roomInput = document.getElementById('room');
        this.joinButton = document.getElementById('join-room');

        this.socket = io();
        this.init();
    }

    init(){
        this.form.addEventListener('submit', this.onFormSubmit.bind(this));
        this.joinButton.addEventListener('click', this.joinRoomClicked.bind(this));

        this.socket.on('connect', this.onConnect.bind(this));
        this.socket.on('chat message', this.onChatMessageReceived.bind(this));
    }

    addMessage(content) {
        const y = document.body.scollHeight;
        const li = document.createElement('li');
        li.setAttribute('class', 'list-group-item')

        li.textContent = content;

        this.messages.appendChild(li);

        window.scrollTo(0, y);
    }

    joinRoomClicked(){
        this.socket.emit('join room', this.roomInput.value, this.addMessage.bind(this));
    }

    onFormSubmit(e) {

        e.preventDefault();

        if (this.messageInput.value){
            let messageContent = {
                user: this.userInput.value,
                message: this.messageInput.value,
                room: this.roomInput.value
            };
            let json = JSON.stringify(messageContent);
            this.socket.emit('chat message', json);
            this.messageInput.value = '';
        }
    }
    
    onConnect() {
        const content = `Connected with id ${this.socket.id}`;
        this.addMessage(content);
        this.roomInput.value = this.socket.id;
    }

    onChatMessageReceived(message) {
        const msg = JSON.parse(message);
        const content = `${msg.user}: ${msg.message}`;

        this.addMessage(message);
    }
}
