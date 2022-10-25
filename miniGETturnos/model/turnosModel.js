const turnos = require('../data/turnos')
const filemanagement = require('../utils')
const fs = require('fs')
const { Sinturno } = require('./Errors/sinTurno')
const { TurnoOcupado } = require('./Errors/turnoOcupado')
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(turnos)
    })
}

function create(turno) {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/turnos.json', function (err, data) {

            if (err) throw err;

            const mapa = (JSON.parse(data)).map(function (element) {
                return element;
            });

            let turnoFecha = mapa.filter(turnoB => {
                return turnoB["fecha"] == turno.fecha && turnoB["branchId"] == turno.branchId;
            }).map(turnoB => {
                return turnoB;
            });

            if (turnoFecha.length == 0) {
                reject(new Sinturno())
            } else {

                console.log(turnoFecha);

                if (turnoFecha[0]['userid'] == null) {
                    turnoFecha[0]['userid'] = turno['userid'];
                    turnoFecha[0]['email'] = turno['email'];
                    const newTurno = turno
                    //turnos.push(newTurno)

                    filemanagement.writeDataToFile('./data/turnos.json', mapa)
                    resolve(newTurno)
                } else {
                    reject(new TurnoOcupado());
                }
            }

        });


    })
}

module.exports = {
    findAll,
    create
}