const turnos = require('../data/turnos')
const filemanagement = require('../utils')
const fs = require('fs')
const { Console } = require('console')

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
        
            //console.log(mapa);           
            
            let algunos = mapa.filter(turno => {        
                return turno[1]["id"]==3;
            }).map(turno => {
                return turno;
            });             
            
            console.log(algunos);

            // map.filter((userId) => userId == turno.userId)

            console.log("*************************************")
            //console.log(id3);

            
            //console.log(ultturno["userId"])
            // console.log(ultturno);
            //console.log(ultturno["id"]-1);
        
            // if (ultturno != null){
            //     var turno = {
            //         id: ultturno["id"]+1,
            //         datetime: '2022-09-02T19:58:10.406Z',
            //         userId: ultturno["userId"]+1,
            //         email: 'email@gmail.com',
            //         branchId: 4
            //     };
        
            // } else{
            //     var turno = {
            //         id: 1,
            //         datetime: '2022-09-02T19:58:10.406Z',
            //         userId: 3,
            //         email: 'email@gmail.com',
            //         branchId: 4
            //     };
            // }

    
        
            //turnos.push(turno);
        
        
                // fs.writeFile("turnos.json", JSON.stringify(turnos), err => {
        
                // if (err) throw err; 
        
                // console.log(turnos);
                // });
        });
    })
}

module.exports = {
    findAll,
    create
}