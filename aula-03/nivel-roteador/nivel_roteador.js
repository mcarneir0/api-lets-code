const express = require('express');
var app = express();

var rotas = express.Router();   //  Fazendo uso de rotas

// Este código é executado para cada solicitação ao roteador
rotas.use(function (req, res, next) {
  console.log('Data e Hora:', new Date().toString());
  next();
});

// uma sub - pilha de middleware mostra informações de solicitação para qualquer tipo de solicitação HTTP para o caminho / user /: id
rotas.use('/user/:id', function (req, res, next) {
  console.log('Url solicitada:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Tipo de requisicao:', req.method);
  next();
});

// aqui usando o get
rotas.get('/user/:id', function (req, res, next) {
  // se o id for 0 vai pular para a proxima rota
  if (req.params.id == 0) next('route');
  // se não pula para a proxima função
  else next(); //
}, function (req, res, next) {
  res.send("Estou aqui na função pois o parâmetro é diferente de 0");
});

// handler for the /user/:id path, which renders a special page
rotas.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.send("Estou aqui na função pois o parâmetro é igual a  0");
});

// aqui montando o roteador base
app.use('/', rotas);

// colocando a porta que vai ser ouvida
app.listen(3000);
console.log('Servidor rodando em http://localhost:3000');
