const express = require('express');
const { auth } = require('express-openid-connect');
const auth0 = require(`${__dirname}/core/auth0`);
const socket = require(`${__dirname}/core/socket`);
const router = require('./routes/index')

const app = express();
const config = new auth0();
const chatSocket = new socket(app);

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));
app.use(auth(config));
app.use(setUserToViews);
app.use('/', router);
app.use(handle404);
app.use(handleError);

function setUserToViews(req, res, next){
    if (req.oidc.user) {
        res.locals.user = req.oidc.user;
    } else {
        res.locals.user = null;
    }
    
    next();
}

function handle404(req, res, next){
    console.log(JSON.stringify(req));

    const error = new Error("Not Found");
    error.status = 404;
    next(error);
}

function handleError(err, req, res, next) {
    console.log(JSON.stringify(req));

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });

    next();
}
