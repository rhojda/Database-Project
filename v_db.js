const express = require('express')
const app = express()
const port = 3000

const indexRouter = require('./routes/index');
const gamesRouter = require('./routes/games');
const consolesRouter = require('./routes/consoles');

var handlebars = require('express-handlebars').create();

app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/consoles', consolesRouter);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/* GET home page. */
app.use('/', function (req, res, next) {
    res.send("<h1>Database</h1>");
});

// custom 404 page
app.use((req, res) => {
    res.status(404)
    res.send('<h1>404 - Not Found</h1>')
})


// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))
