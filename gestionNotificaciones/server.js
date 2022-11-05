const http = require('http')
const https = require("https")
const { getPostData } = require('./utils')

const headers = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Content-Type': 'application/json'
}

const server = http.createServer((req, res) => {
    if (req.method == 'POST' && req.url.startsWith('/api/notificacion'))
        sendMail(req, res)
});

const PORT = process.env.PORT || 5004;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;

async function sendMail(req, res){
    const reqbody = await getPostData(req);     //obtengo body enviado por gestion reservas
    console.log(reqbody);

    const request = https.request('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST', 
        headers: {
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        }
    }, function (response) {
            res.writeHead(response.statusCode, headers);
            res.end()
    });
    const mailbody = getBody(reqbody)     //convierto cuerpo mail
    request.write(mailbody);        //envio mail
    request.end();
}

function getBody(sbody) {
    var { destinatario, asunto, cuerpo} = JSON.parse(sbody);
    const respuesta = '{"personalizations":[{"to":[{"email": "' + destinatario + '","name":"John Doe"}],"subject": "' + asunto + '"}],"content": [{"type": "text/plain", "value": "' + cuerpo + '"}],"from":{"email":"maria-camila-2000@hotmail.com","name":"Sam Smith"},"reply_to":{"email":"maria-camila-2000@hotmail.com","name":"Sam Smith"}}'

    return respuesta
}