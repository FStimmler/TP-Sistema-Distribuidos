const http = require('http')
const { getPostData } = require('./utils')

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Content-Type': 'application/json'
}

const server = http.createServer((req, res) => {

    if (req.url.includes('/api/turnos')) {
        callTurnos(req, res);
    }

    if (req.url.includes('/api/sucursales')) {
        callSucursales(req, res);
    }
});


const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;


async function callTurnos(req, res) {
    const reqbody = await getPostData(req);
    console.log(reqbody);

    const request = http.request('http://localhost:5000'+req.url, { method: req.method }, function (response) {

        let body = ''

        response.on('data', (chunk) => {
            body += chunk;
        });

        response.on('end', () => {

            res.writeHead(response.statusCode, headers);
            res.end(body)
        });



    });
    request.write(reqbody);
    request.end();
    
}

async function callSucursales(req, res) {
    const reqbody = await getPostData(req);
    console.log(reqbody);

    const request = http.request('http://localhost:5002'+req.url, { method: req.method }, function (response) {

        let body = ''

        response.on('data', (chunk) => {
            body += chunk;
        });

        response.on('end', () => {

            res.writeHead(response.statusCode, headers);
            res.end(body)
        });



    });
    request.write(reqbody);
    request.end();
    
}


