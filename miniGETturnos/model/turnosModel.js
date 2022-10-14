let turnos = require('../data/turnos')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(turnos)
    })
}

module.exports = {
    findAll,
}