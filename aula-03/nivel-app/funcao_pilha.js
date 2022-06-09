const express = require('express');
var app = express();

app.use('/user/:id', function(req, res, next) {
    console.log('URL requisitado:', req.url);
    next();
}, function(req, res, next) {
    console.log('Tipo de requisição:', req.method);
    next();
});

app.listen(3000);
console.log('Servidor rodando em http://localhost:3000');
