import http from 'http';

//  Definindo o servidor
const port = 3000;

const requestListener = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
}

//  Rodando o servidor
const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
