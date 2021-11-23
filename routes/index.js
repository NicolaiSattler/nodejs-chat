const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: "Express",
        isAuthenticated: req.oidc.isAuthenticated() 
    });
});

module.exports = router;
