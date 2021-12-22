class Chat {
    constructor() {

        this.messages = document.getElementById('messages');
        this.form = document.getElementById('form');
        this.messageInput = document.getElementById('message');
        this.userInput = document.getElementById('user');

        this.socket = io();
        this.init();
    }

    init(){
        this.form.addEventListener('submit', this.onFormSubmit.bind(this));
        this.socket.on('chat message', this.onChatMessageReceived.bind(this));
    }

    onFormSubmit(e) {

        e.preventDefault();

        if (this.messageInput.value){
            let messageContent = {
                user: this.userInput.value,
                message: this.messageInput.value
            };
            let json = JSON.stringify(messageContent);
            this.socket.emit('chat message', json);
            this.messageInput.value = '';
        }
    }

    onChatMessageReceived(msg) {
        let json = JSON.parse(msg);
        let li = document.createElement('li');
        let y = document.body.scollHeight;

        li.textContent = `${json.user}: ${json.message}`;

        this.messages.appendChild(li);

        window.scrollTo(0, y);

    }
}
