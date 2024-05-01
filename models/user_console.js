const db = require('../database')

exports.add = async (userConsole) => {
    return db.getPool()
        .query(`INSERT INTO
            users_consoles(console_id, user_id)
            VALUES($1, $2) RETURNING *`,
            [userConsole.consoleId, userConsole.userId]);
}

exports.upsert = (userConsole) => {
    if (userConsole.id) {
        return exports.update(userConsole);
    } else {
        return exports.add(userConsole);
    }
}

exports.get = async (console, user) => {
    const { rows } = await db.getPool().query(`
      select *
      from users_consoles
      where console_id = $1 and user_id = $2`,
        [console.id, user.id])
    return db.camelize(rows)[0]
}

exports.allForUser = async (user) => {
    const { rows } = await db.getPool().query(`
      select consoles.name
      from users_consoles
      join consoles on consoles.id = users_consoles.console_id
      where user_id = $1;`,
        [user.id]);
    return db.camelize(rows);
}
