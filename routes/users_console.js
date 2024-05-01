const express = require('express');
const Console = require('../models/console');
const UserConsole = require('../models/user_console');
const router = express.Router();


router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    let consoleId = req.body.consoleId;
    redirect = `/consoles/show/${consoleId}`;
    await UserConsole.upsert(req.body);
    res.redirect(303, redirect)
});

module.exports = router;