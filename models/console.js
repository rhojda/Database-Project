const db = require('../database')

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from consoles order by id");
    return db.camelize(rows);
}

exports.add = async (console) => {
    return db.getPool()
        .query("INSERT INTO consoles(name) VALUES($1) RETURNING *",
            [console.name]);
}

exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from consoles where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.update = async (console) => {
    return await db.getPool()
        .query("UPDATE consoles SET name = $1 where id = $2 RETURNING *",
            [console.name, console.id]);
}

exports.upsert = async (console) => {
    if (console.id) {
        return exports.update(console);
    } else {
        return exports.add(console);
    }
}



