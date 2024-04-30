const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const games = [
        "Red Dead Redemption", "Subnautica", "Far Cry Primal"
    ]
    res.render('games/index', { title: 'Video Game Database || Games', games: games });
});

module.exports = router;