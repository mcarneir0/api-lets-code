const express = require('express');
var app = express();

var rotas = express.Router();   //  Fazendo uso de rotas

rotas.use(function(req, res, next) {
    console.log('Data e hora:', new Date().toString());
    next();
});

app.listen(3000);
console.log('Servidor rodando em http://localhost:3000');
