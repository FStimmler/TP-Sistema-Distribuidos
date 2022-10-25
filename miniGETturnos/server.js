const http = require('http')
const Turnos = require('./model/turnosModel')
const { getPostData } = require('./utils')
const { hashCode } =require('./utils')

const headers = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Content-Type': 'application/json'
}

const server = http.createServer((req, res) => {

    if (req.url === '/api/turnos' && req.method === 'GET') {
        getTurnos(req, res);
    }
    else if (req.url === '/api/turnos' && req.method === 'POST') {

        createTurno(req, res)
    }

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;


// @desc    Gets all Turnos
// @route   GET /api/turnos
async function getTurnos(req, res) {
    try {
        const turnos = await Turnos.findAll()

        const headers = {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
            'Content-Type': 'application/json'
        }
        res.writeHead(200, headers);
        res.end(JSON.stringify(turnos))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Turno
// @route   POST /api/turnos
async function createTurno(req, res) {
    try {

        const body = await getPostData(req);

        console.log(body);

        const { fecha, email, branchId_s } = JSON.parse(body);

      
        userid=hashCode(email);
        branchId = parseInt(branchId_s);



        const turno = {
            fecha,
            userid,
            email,
            branchId
        }

        const newTurno = Turnos.create(turno).then( ()=>{
            res.writeHead(201, headers);
            return res.end(JSON.stringify(newTurno));

        },(error)=>{
            console.log(error.status);
            res.writeHead(error.status,headers);
            res.end(error.toString());
        } )


        


    } catch (error) {
        console.log(error)
    }

}