const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//  Iniciando o servidor
const app = express();

//  Determinar o uso de JSON
app.use(express.json());

//  Conectando com o banco de dados
mongoose.connect(
    'mongodb+srv://mcarneiro:Mc123456@cluster0.c5faz.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//  Fazendo o require da pasta models
requireDir('./src/models');

//  Fazendo o require das rotas
app.use('/api', require('./routers/index.routes'));

//  Iniciando o servidor
app.listen(3333);
console.log('Servidor rodando em http://localhost:3333');
