const express = require('express');
var app = express();

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Erro interno do servidor');
});

app.listen(3000);
console.log('Servidor rodando em http://localhost:3000');
