const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: "Home",
        isAuthenticated: req.oidc.isAuthenticated() 
    });
});
router.get('/chat', (req, res, next) => {
    res.render('chat', {
        title: "Chat",
        isAuthenticated: req.oidc.isAuthenticated()
    });
})

module.exports = router;
