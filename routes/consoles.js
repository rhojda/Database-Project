const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const consoles = [
        "XBOX 360", "PS5", "PC", "PS4"
    ]
    res.render('consoles/index', { title: 'Video Game Database || Consoles', consoles: consoles });
});

module.exports = router;