const consoles = [
    { name: "XBOX 360", gameIds: ["0", "1"] },
    { name: "PS5" },
    { name: "PC" },
    { name: "PS4" }
]

exports.add = (console) => {
    consoles.push(console);
}

exports.get = (idx) => {
    return consoles[idx];
}

exports.upsert = (console) => {
    if (console.gameIds && !Array.isArray(console.gameIds)) {
        console.gameIds = [console.gameIds];
    }
    if (console.id) {
        exports.update(console);
    } else {
        exports.add(console);
    }
}

exports.update = (console) => {
    consoles[console.id] = console;
}


exports.all = consoles