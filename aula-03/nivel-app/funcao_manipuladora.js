const express = require('express');
var app = express();

app.use('/user/:id/:nome', function(req, res, next) {
    console.log('Tipo de requisição:', req.method);
    next();
});

app.get('/user/:id', function(req, res, next) {
    res.send('Na rota de user/:id');

});

app.listen(3000);
console.log('Servidor rodando em http://localhost:3000');
