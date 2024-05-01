const db = require('../database')

/*
const genres = [
    { name: "Fantasy" },
    { name: "Adventure" },
]
*/

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from genres order by id");
    return db.camelize(rows);
}

exports.add = (genre) => {
    genres.push(genre);
}

exports.get = (idx) => {
    return genres[idx];
}

exports.upsert = (genre) => {
    if (genre.id) {
        exports.update(genre);
    } else {
        exports.add(genre);
    }
}

exports.update = (genre) => {
    genres[genre.id] = genre;
}

/*
exports.all = genres
*/