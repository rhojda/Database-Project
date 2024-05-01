const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.get('/', function (req, res, next) {
    const games = Game.all
    res.render('games/index', { title: 'Video Game Database || Games', games: games });
});

router.get('/form', async (req, res, next) => {
    res.render('games/form', { title: 'Video Game Database || Games' });
});

router.get('/edit', async (req, res, next) => {
    let gameIndex = req.query.id;
    let game = Game.get(gameIndex);
    res.render('games/form', { title: 'Video Game Database || Games', game: game, gameIndex: gameIndex });
});

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Game.upsert(req.body);
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `the game has been ${createdOrupdated}!`,
    };
    res.redirect(303, '/games')
});


module.exports = router;