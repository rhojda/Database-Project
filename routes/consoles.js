const express = require('express');
const Console = require('../models/console');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const consoles = await Console.all();
    res.render('consoles/index', { title: 'Video Game Database || Consoles', consoles: consoles });
});

router.get('/form', async (req, res, next) => {
    res.render('consoles/form', { title: 'Video Game Database || Consoles' });
});

router.get('/edit', async (req, res, next) => {
    let consoleId = req.query.id;
    let console = await Console.get(consoleId);
    res.render('consoles/form', { title: 'Video Game Database || Consoles', console: console });
});

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Console.upsert(req.body);
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `the console has been ${createdOrupdated}!`,
    };
    res.redirect(303, '/consoles')
});

module.exports = router;
