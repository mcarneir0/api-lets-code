import http from 'http';

const port = 3000;
const ip = 'localhost';

const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/') {
        res.end('Estou na home');
    }

    if (req.url === '/contato') {
        res.end('Estou no contato');
    }
});

server.listen(port, ip, () => {
    console.log(`Servidor rodando em http://${ip}:${port}`);
});
