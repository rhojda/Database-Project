const users = [
    {
        email: "rhojda@pratt.edu",
        name: "Rafa", password: "123"
    }
];

exports.add = (user) => {
    users.push(user);
}

exports.getByEmail = (email) => {
    return users.find((user) => user.email === email);
}

exports.login = (login) => {
    let user = exports.getByEmail(login.email);
    if (user && user.password === login.password) {
        return user;
    }
    return null;
}

exports.all = users
