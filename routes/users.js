const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', async (req, res, next) => {
    res.render('users/register', { title: 'Video Game Database || Registration' });
});

router.post('/register', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body));
    User.add(req.body);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `the user has been created!`,
    };
    res.redirect(303, '/');
});

module.exports = router;