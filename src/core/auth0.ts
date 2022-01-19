import dotenv from 'dotenv';

export class auth0 {

    public authRequired : boolean;
    public auth0Logout : boolean;
    public secret: string | undefined;
    public baseURL: string | undefined;
    public clientID: string | undefined;
    public issuerBaseURL: string | undefined;

    constructor(){
        dotenv.config({ path: `${process.cwd()}/secret.env`});

        this.authRequired = true;
        this.auth0Logout = true;
        this.secret = process.env.CLIENT_SECRET;
        this.baseURL = process.env.BASE_URL;
        this.clientID = process.env.CLIENT_ID;
        this.issuerBaseURL = process.env.ISSUER_BASE_URL;
    }
}
