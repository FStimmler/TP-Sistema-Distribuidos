const http = require('http')
const Sucursales = require('./model/sucursalesModel')
const { getPostData } = require('./utils')

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Content-Type': 'application/json'
}

const server = http.createServer((req, res) => {

    if (req.method == 'GET' && req.url.startsWith('/api/sucursales'))
        getSucursales(req, res)

});


const PORT = process.env.PORT || 5002;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;

// @desc    Gets all Sucursales
// @route   GET /api/sucursales
async function getSucursales(req, res) {
    try {

        let {url} = req
        splitUrl=url.split("/");
        
        if(splitUrl.length > 3 ){
            var sucursales = await Sucursales.find(splitUrl[3]);    
        }else{
            var sucursales = await Sucursales.findAll();
        }

        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
            'Content-Type': 'application/json'
        }
        res.writeHead(200, headers);
        res.end(JSON.stringify(sucursales))
    } catch (error) {
        console.log(error)
    }
}
