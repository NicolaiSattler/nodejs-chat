const dotenv = require('dotenv');

class auth0 {
    constructor(){
        dotenv.config({ path: './secret.env' });

        this.authRequired = true;
        this.auth0Logout = true;
        this.secret = process.env.CLIENT_SECRET;
        this.baseURL = process.env.BASE_URL;
        this.clientID = process.env.CLIENT_ID;
        this.issuerBaseURL = process.env.ISSUER_BASE_URL;
    }
}

module.exports = auth0;
