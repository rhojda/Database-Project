const games = [
    { title: "Red Dead Redemption", genreIds: ["0", "1"] },
    { title: "Subnautica" },
]
exports.add = (game) => {
    games.push(game);
}

exports.get = (idx) => {
    return games[idx];
}

exports.upsert = (game) => {
    if (game.id) {
        exports.update(game);
    } else {
        exports.add(game);
    }
}

exports.update = (game) => {
    games[game.id] = game;
}

exports.all = games
