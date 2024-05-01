const express = require('express');
const Console = require('../models/console');
const Game = require('../models/game');
const router = express.Router();

router.get('/', function (req, res, next) {
    const consoles = Console.all
    res.render('consoles/index', { title: 'Video Game Database || Consoles', consoles: consoles });
});

router.get('/form', async (req, res, next) => {
    res.render('consoles/form', { title: 'Video Game Database || Consoles', games: Game.all });
});

router.get('/edit', async (req, res, next) => {
    let consoleIndex = req.query.id;
    let console = Console.get(consoleIndex);
    res.render('consoles/form', { title: 'Video Game Database || Consoles', console: console, consoleIndex: consoleIndex, games: Game.all });
});


router.get('/show/:id', async (req, res, next) => {
    let templateVars = {
        title: 'Video Game Database || Consoles',
        console: Console.get(req.params.id)
    }
    if (templateVars.console.gameIds) {
        templateVars['game'] = Game.get(templateVars.console.gameIds);
    }
    res.render('consoles/show', templateVars);
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