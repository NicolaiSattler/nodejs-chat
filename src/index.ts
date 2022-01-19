import express, { Request, Response, NextFunction } from 'express';
import { auth } from 'express-openid-connect';
import { auth0 } from '../src/core/auth0';
import { socket } from '../src/core/socket';

const rootDir = `${process.cwd()}/src`;
const router = require(`${rootDir}/routes/index`)

const app = express();
const config = new auth0();
const chatSocket = new socket(app);

app.set('views', `${rootDir}/views`);
app.set('view engine', 'ejs');

//TODO: install helmet package
app.use(express.static(`${rootDir}/public`));
app.use(auth(config));
app.use(setUserToViews);
app.use('/', router);
app.use(handle404);
app.use(handleError);

function setUserToViews(req: Request, res: Response, next: NextFunction): void {
    if (req.oidc.user) {
        res.locals.user = req.oidc.user;
        res.locals.username = req.oidc.user.given_name;
    } else {
        res.locals.user = null;
    }
    
    next();
}

function handle404(req: Request, res: Response, next: NextFunction): void {
    console.log(JSON.stringify(req));

    const error = <any>new Error("Not Found");
    error.status = 404;
    next(error);
}

function handleError(err: any, req: Express.Request, res: Response, next: NextFunction): void {
    console.log(JSON.stringify(req));

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });

    next();
}
