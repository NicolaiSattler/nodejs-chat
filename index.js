const express = require('express');
const { auth } = require('express-openid-connect');

const auth0 = require(`${__dirname}/core/auth0.js`);
const socket = require(`${__dirname}/core/socket.js`);

const app = express();
const config = new auth0();
const chatSocket = new socket(app);

app.use(express.static(`${__dirname}/public`));
app.use(auth(config));

//routing
app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.sendFile(`${__dirname}/index.html`);
    }
});
