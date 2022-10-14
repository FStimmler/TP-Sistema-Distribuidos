const turnos = require('../data/turnos')
const filemanagement = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(turnos)
    })
}

function create(turno){
    return new Promise((resolve, reject) =>{
        const newTurno = turno
        turnos.push(newTurno)
        
        filemanagement.writeDataToFile('./data/turnos.json', turnos)
        resolve(newTurno)
    })
}

module.exports = {
    findAll,
    create
}