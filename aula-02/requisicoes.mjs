import https from 'https';

//  GET
const opcao = {
    hostname: 'about.google',   //  URI base da requisição
    port: 443,      //   Porta padrão para requisições HTTPS
    path: '/stories/' ,      //   Rota de acesso após o hostname
    method: 'GET',  //   Método da requisição
};

const req = https.request(opcao, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`statusMessage: ${res.statusMessage}`);
    res.on('data', (chunk) => {
        process.stdout.write(chunk);    //  Imprime o conteúdo da resposta
    });
}); //  Listener de execução da requisição

req.on('error', (e) => {
    console.log(e);
}); //  Listener de erro da requisição

req.end(); //  Finaliza a requisição
