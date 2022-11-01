const sucursales = require('../data/sucursales')
const filemanagement = require('../utils')
const fs = require('fs')


function findAll() {
    return new Promise((resolve, reject) => {
        resolve(sucursales)
    })
}

function find(id) {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/sucursales.json', function (err, data) {

            if (err) throw err;

            const mapa = (JSON.parse(data)).map(function (element) {
                return element;
            });

            let sucursal = mapa.filter(sucursalB => {
                return (sucursalB['id']==id);
            }).map(sucursalB => {
                return sucursalB;
            });

            resolve(sucursal);

        });


    })

}


module.exports = {
    findAll,
    find,
}