const db = require('../database')

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from games order by id");
    return db.camelize(rows);
}

exports.add = async (game) => {
    const { rows } = await db.getPool()
        .query("INSERT INTO games(title, developer, genre_id, release_date) VALUES($1, $2, $3, $4) RETURNING *",
            [game.title, game.developer, game.genreId, game.releaseDate]);
}


exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from games where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.update = async (game) => {
    const { rows } = await db.getPool()
        .query("UPDATE games SET title = $1, developer = $2, genre_id = $3, release_date = $4 where id = $5 RETURNING *",
            [game.title, game.developer, game.genreId, game.releaseDate, game.id]);
}

exports.upsert = async (game) => {
    if (game.id) {
        return exports.update(game);
    } else {
        return exports.add(game);
    }
}
