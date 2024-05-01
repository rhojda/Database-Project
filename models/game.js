const db = require('../database')

/*
const games = [
    { title: "Red Dead Redemption" },
    { title: "Subnautica" },
]
*/

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from games order by id");
    return db.camelize(rows);
}

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

/*
exports.all = games
*/