const games = [
    { title: "Red Dead Redemption" },
    { title: "Subnautica" },
]

exports.add = (game) => {
    games.push(game);
}

exports.get = (idx) => {
    return games[idx];
}

exports.update = (game) => {
    games[game.id] = game;
}

exports.upsert = (game) => {
    if (game.id) {
        exports.update(game);
    } else {
        exports.add(game);
    }
}

exports.all = games
