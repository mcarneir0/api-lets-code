const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
require('dotenv').config();

//  Iniciando o servidor
const app = express();

//  Determinar o uso de JSON e CORS
app.use(express.json());
app.use(cors());

//  Conectando com o banco de dados
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//  Fazendo o require da pasta models
requireDir('./models');

//  Fazendo o require das rotas
app.use('/api', require('./routers/index.routes'));

//  Iniciando o servidor
app.listen(3333);
console.log('Servidor rodando em http://localhost:3333');
