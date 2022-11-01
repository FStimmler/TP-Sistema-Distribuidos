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

function findQ(params) {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/turnos.json', function (err, data) {

            if (err) throw err;

            const mapa = (JSON.parse(data)).map(function (element) {
                return element;
            });

            let turnosQ = mapa.filter(turnoB => {
                return  (!params.has('fecha') || turnoB["fecha"].split('T')[0] == params.get('fecha').split('T')[0]) && (!params.has('branchId') || turnoB["branchId"] == params.get('branchId'))&& (!params.has('userId') || turnoB["userId"] == params.get('userId') || (turnoB["userId"] ==null && params.get('userId')=='null')   );
            }).map(turnoB => {
                return turnoB;
            });

            resolve(turnosQ);

        });


    })

}

function findByIdReserva(idReserva){
    return new Promise((resolve, reject) => {
        if(turnos.length > idReserva)
            resolve(turnos[idReserva])
        else
            resolve(undefined)
    })
}

function modifyTurno(idReserva){
    return new Promise((resolve, reject) => {
        fs.readFile('./data/turnos.json', function (err, data){
            if (err) throw err;

            let turnos = JSON.parse(data)

            if(turnos.length < idReserva)
                reject(new Sinturno())
            else{
                turnos[idReserva]['userId'] = null
                turnos[idReserva]['email'] = null
                filemanagement.writeDataToFile('./data/turnos.json', turnos)
                resolve(turnos[idReserva])
            }
        })
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
                console.log(turnoB["id"]+" / "+turno.id);
                return turnoB["id"] == turno.id;
            }).map(turnoB => {
                return turnoB;
            });

            if (turnoFecha.length == 0) {
                reject(new Sinturno())
            } else {

                console.log(turnoFecha);

                if (turnoFecha[0]['userId'] === null) {
                    turnoFecha[0]['userId'] = turno['userId'];
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
    findQ,
    findByIdReserva,
    modifyTurno,
    create
}