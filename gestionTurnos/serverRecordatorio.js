const http = require('http')
const turnos = require('./data/turnos')
const fs = require('fs')


const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Content-Type': 'application/json'
}

var now = new Date();
var millisTill = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 08, 00, 0) - now;            //horario de envio
if (millisTill < 0) {
    millisTill += 86400000;
}


setTimeout(()=>{
    enviaMails()
    setInterval(enviaMails, 86400000)
}, millisTill)

async function enviaMails(){
    const turnosaenviar = await buscaTurnos()

        console.log("adentro")
        const mapa = (turnosaenviar).map(function (element) {
            const request = http.request('http://localhost:5004/api/notificacion', {
             method: 'POST',
             headers
            }, function (response) {
                console.log("finalizo")
            });
            const mailbody = {
                "destinatario": element["email"],
                "asunto": "Recordatorio de turno",
                "cuerpo": "El dia " + element["fecha"]
            }
            request.write(JSON.stringify(mailbody));        //envio mail
            request.end();
        });
}

function buscaTurnos() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/turnos.json', function (err, data) {
            if (err) throw err;

            const mapa = (JSON.parse(data)).map(function (element) {
                return element;
            });

            let turnoFecha = mapa.filter(turnoB => {
                if (turnoB["userId"] !== null) {
                    var now = new Date();
                    difHorario = Date.parse(turnoB["fecha"]) - now + now.getTimezoneOffset() * 60000
                    if (difHorario <= 86400000 && difHorario > 0) {
                        return turnoB;
                    }
                }
            }).map(turnoB => {
                return turnoB;
            });

            resolve(turnoFecha)
        });
    })
}