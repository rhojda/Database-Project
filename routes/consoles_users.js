const express = require('express');
const router = express.Router();

const ConsoleUser = require('../models/user_console');

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    let consoleId = req.body.bookId;
    let redirect = `/books/show/${bookId}`;
    BookUser.upsert(req.body);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'Your status has been stored',
    };
    res.redirect(303, redirect)
});

module.exports = router;