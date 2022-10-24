const turnos = require('../data/turnos')
const filemanagement = require('../utils')
const fs = require('fs')
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(turnos)
    })
}

function create(turno){
    return new Promise((resolve, reject) =>{
        fs.readFile('./data/turnos.json', function(err, data) {

            if (err) throw err;
            
        
            //const map = new Map(Object.entries(JSON.parse(data)));
        
            //var ultturno = map.get((map.size-1).toString());

            

            const mapa = Object.entries(JSON.parse(data)).map(function(element){
                return element;
            });        
            
            let algunos = mapa.filter(turnoB => {        
                return turnoB[1]["userid"]==turno.userid && turnoB[1]["fecha"]==turno.fecha && turnoB[1]["branchId"]==turno.branchId;
            }).map(turnoB => {
                return turnoB;
            });             
            console.log('----------------------------');
            console.log(algunos);
            console.log(algunos.length)

            if(algunos.length==0){
            const newTurno = turno
            turnos.push(newTurno)
            
            filemanagement.writeDataToFile('./data/turnos.json', turnos)
            resolve(newTurno) 
            }else{
                reject(new Error('Turno Ocupado'));
            }

        });
            
       
    })
}

module.exports = {
    findAll,
    create
}