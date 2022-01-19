import express, {Request, Response, NextFunction} from 'express'
import { requiresAuth } from 'express-openid-connect';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index', {
        title: "Home",
        isAuthenticated: req.oidc.isAuthenticated() 
    });
});

router.get('/chat', (req: Request, res: Response, next: NextFunction) => {
    res.render('chat', {
        title: "Chat",
        isAuthenticated: req.oidc.isAuthenticated()
    });
})

module.exports = router;