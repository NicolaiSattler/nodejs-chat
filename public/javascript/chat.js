class Chat {
    constructor() {

        this.messages = document.getElementById('messages');
        this.form = document.getElementById('form');
        this.input = document.getElementById('input');

        this.socket = io();
        this.init();
    }

    init(){
        this.form.addEventListener('submit', (e) =>{
            e.preventDefault();

            if (input.value){
                this.socket.emit('chat message', input.value);
                this.input.value = '';
            }
        });

        this.socket.on('chat message', (msg) => {
            let li = document.createElement('li');
            let y = document.body.scollHeight;

            li.textContent = msg;

            this.messages.appendChild(li);

            window.scrollTo(0, y);

        });
    }
}

