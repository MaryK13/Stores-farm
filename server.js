const express = require('express')
const createError = require('http-errors')
const fs = require('fs')
const favicon = require('express-favicon')
const path = require('path')
const port = process.env.PORT || 3001

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();
app.use(favicon(__dirname + '/public/favicon.png'));

//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// получение дом.страницы
app.get('/stores', function(req, res, next) {
    fs.readFile(__dirname + '/public/stores.json', (e, data) => {
        if (e) throw e;
        res.send(data);
    });
});
app.delete('/stores/:id', function(req, res, next) {
    next(createError(500))
});

app.put('/stores/:id', function (req, res) {
    res.send({success: true})
});

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

app.listen(port);
