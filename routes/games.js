const express = require('express');
const Game = require('../models/game');
const Genre = require('../models/genre');
const router = express.Router();


router.get('/', async (req, res, next) => {
    const games = await Game.all();
    res.render('games/index', { title: 'Video Game Database || Games', games: games });
});

router.get('/form', async (req, res, next) => {
    res.render('games/form', { title: 'Video Game Database || Games', genres: await Genre.all() });
});

router.get('/edit', async (req, res, next) => {
    let gameId = req.query.id;
    let game = await Game.get(gameId);
    res.render('games/form', { title: 'Video Game Database || Games', game: game, genres: await Genre.all() });
});

router.get('/show/:id', async (req, res, next) => {
    const game = await Game.get(req.params.id)
    let templateVars = {
        title: 'Video Game Database || Games',
        game: game,
        gameId: req.params.id,
    }
    if (game.genreId) {
        templateVars['genre'] = await Genre.get(game.genreId);
    }
    res.render('games/show', templateVars);
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