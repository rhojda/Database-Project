const db = require('../database')

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from games order by id");
    return db.camelize(rows);
}

exports.add = async (game) => {
    return db.getPool()
        .query("INSERT INTO games(title) VALUES($1) RETURNING *", [game.title]);
}

exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from games where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.update = async (game) => {
    return await db.getPool()
        .query("UPDATE games SET title = $1 where id = $2 RETURNING *",
            [game.title, game.id]);
}

exports.upsert = async (game) => {
    if (game.id) {
        return exports.update(game);
    } else {
        return exports.add(game);
    }
}